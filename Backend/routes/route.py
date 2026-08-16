from fastapi import APIRouter, Request

from models.yuyus import (Tags, FanArts, Preferences, FanArtWithId, RejectionMotivesAndId, MangaPage)
from config.database import (collection_name, collection_fanArts,collection_users, collection_mangas)
from schema.schemas import (list_serial , list_serial_fanArts,list_serial_user,list_serial_mangas)
from functions.functions import (create_token,generate_verification_token,send_email_token,get_current_user,get_optional_user,set_search_tags, send_email_rejection_motive)
from bson import ObjectId
from pydantic import EmailStr
from typing import List
from passlib.context import CryptContext
from fastapi import Depends, UploadFile, File, BackgroundTasks, Query, Form
from config.cloudinary import(cloudinary)
from config.i18n import(settings_internalization) 
import os, json
from bson.objectid import ObjectId
from typing import Annotated, Optional
from config.limiter import limiter

#import bcrypt

translations = {}

for lang in settings_internalization.supported_locales:
    path = os.path.join("locales", lang, "messages.json")
    with open(path, encoding="utf-8") as f:
        translations[lang] = json.load(f)

router = APIRouter()

# User related endpoints
@router.get("/user")
@limiter.limit("3/minute")
async def get_users(request: Request):
    users = list_serial_user(collection_users.find())
    return users

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
@router.post("/user")
@limiter.limit("5/minute; 50/day")
async def post_user(request: Request, userName:Annotated[str, Form()],email:Annotated[EmailStr, Form()],password:Annotated[str, Form()], lang:Annotated[str, Form()], background_tasks: BackgroundTasks):

    try:
        user = collection_users.find_one({"userName":userName})
        if user:
            return {"code":"USERNAME_ALREADY_REGISTERED","success":False,"token":None}
       
        user = collection_users.find_one({"email":email})
        if user:
            return {"code":"EMAIL_ALREADY_REGISTERED","success":False,"token":None}
            
        settings_internalization

        verification_code = generate_verification_token()
        background_tasks.add_task(send_email_token, email, verification_code, message=translations.get(lang, translations[settings_internalization.default_locale])["body_one"], subject=translations.get(lang, translations[settings_internalization.default_locale])["subject_one"])
        
        passw = password
        hased = pwd_context.hash(passw)
        password = hased
        
        item = {
            "userName":userName,
            "password":password,
            "role":"User",
            "email":email,
            "verified":False,
            "verification_token":verification_code,
            "preferences":{
                "language":lang,
                "showExplicit":False,
                "hideTags":[]
            }
        }
        
        collection_users.insert_one(item)
        
        userInDatabase = collection_users.find_one({"userName":userName})
        token = create_token({"id":str(userInDatabase["_id"]),"email":userInDatabase["email"],"userName":userInDatabase["userName"],"verified":userInDatabase["verified"]})
        return {"code":"USER_CREATED","success":True,"token":token}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False,"token":None}
    
@router.get("/user/resendCode")
@limiter.limit("5/minute; 50/day")
async def resend_code(request: Request, background_tasks: BackgroundTasks, lang:str, user = Depends(get_current_user)):
    if user["type"] != "Success":
        return {"code":"UNEXPECTED_ERROR","success":False}
    
    try:
        token = generate_verification_token()

        collection_users.update_one(
            {"email": user["user_data"]["email"]},
            {
                "$set": {"verification_token":token},
            }
        )

        background_tasks.add_task(send_email_token, user["user_data"]["email"], token, message=translations.get(lang, translations[settings_internalization.default_locale])["body_two"], subject=translations.get(lang, translations[settings_internalization.default_locale])["subject_one"])

        return {"code":"VERIFICATION_CODE_SENT","success":True}
    
    except Exception:
        return {"code":"EMAIL_NOT_FOUND","success":False}

@router.post("/user/changeEmail")
@limiter.limit("5/minute; 50/day")
async def change_email(request: Request, background_tasks: BackgroundTasks, email:Annotated[EmailStr, Form()], lang:Annotated[str, Form()], user = Depends(get_current_user)):
    try:
        token = generate_verification_token()

        collection_users.update_one(
            {"email": user["user_data"]["email"]},
            {
                "$set": {"verification_token":token,"email":email},
            }
        )

        newMail = collection_users.find_one({"email":email})
        newMail = newMail["email"]
        background_tasks.add_task(send_email_token, newMail, token, message=translations.get(lang, translations[settings_internalization.default_locale])["body_one"], subject=translations.get(lang, translations[settings_internalization.default_locale])["subject_one"])

        return {"code":"EMAIL_CHANGED","success":True}
    
    except user["type"] != "Success":
        return {"code":"INVALID_TOKEN","success":False}
 
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}
    
@router.post("/user/isDataRegistered")
@limiter.limit("60/minute")
async def is_name_registerd(request: Request, name:Annotated[str, Form()],email:Annotated[str, Form()]):
    user = collection_users.find_one({"email":email})
    if user:
        return {"code":"EMAIL_ALREADY_REGISTERED","success":False}
        
    user = collection_users.find_one({"userName":name})
    if user:
        return {"code":"USERNAME_ALREADY_REGISTERED","success":False}
    
    return {"code":"DATA_UNREGISTERED","success":True}
    
@router.post("/user/reset_password/begin")
@limiter.limit("5/minute; 50/day")
async def reset_password_begin(request: Request, email:Annotated[str, Form()], lang:Annotated[str, Form()], background_tasks: BackgroundTasks):
    user = collection_users.find_one({"email":email})

    if not user:
        return {"code":"NOT_FOUND_USER","success":False}
    
    token = generate_verification_token()
    collection_users.update_one(
        {"_id":user["_id"]},
        {
            "$set":{"reset_password_token":token}
        }
    )

    background_tasks.add_task(send_email_token, user["email"], token, message=translations.get(lang, translations[settings_internalization.default_locale])["body_reset_password"], subject=translations.get(lang, translations[settings_internalization.default_locale])["subject_reset_password"])
    return {"code":"PASSWORD_RESET_CODE_SENT","success":True}

@router.post("/user/reset_password/change")
@limiter.limit("5/minute; 50/day")
async def validate_reset_password(request: Request, token:Annotated[str, Form()], password:Annotated[str, Form()]):
    user = collection_users.find_one({"reset_password_token":token})
    if not user:
        return {"code":"INVALID_RESET_PASSWORD_TOKEN","success":False}
    
    hasedPassword = pwd_context.hash(password)
    
    collection_users.update_one(
        {"_id":user["_id"]},
        {
            "$set":{"password":hasedPassword},
            "$unset":{"reset_password_token":""}
        }
    )

    return {"code":"PASSWORD_CHANGED","success":True}

@router.post("/user/verify-email")
@limiter.limit("100/hour")
async def verify_email(request: Request, token: Annotated[str, Form()]):

    user = collection_users.find_one({"verification_token": token})

    if not user:
        return {"code":"INVALID_VERIFICATION_TOKEN","success":False}

    collection_users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"verified": True},
            "$unset": {"verification_token": ""}
        }
    )
    return {"code":"EMAIL_VERIFIED","success":True}

@router.post("/user/login")
@limiter.limit("5/minute; 70/day")
async def login(request: Request, userName:Annotated[str, Form()], password:Annotated[str, Form()]):
    foundUser = collection_users.find_one({"userName":userName})
    if not foundUser:
        return {"code":"USERNAME_NOT_FOUND","success":False,"token":None}

    foundPassword = pwd_context.verify(password, foundUser["password"])
    if not foundPassword:
        return {"code":"INCORRECT_PASSWORD","success":False,"token":None}

    token = create_token({"userName":foundUser["userName"],"id":str(foundUser["_id"]),"role":foundUser["role"],"email":foundUser["email"],"verified":foundUser["verified"],"preferences":{"language":foundUser["preferences"]["language"]}})
    if foundUser["verified"]:
        return {"code":"LOGIN_SUCCESSFUL","success":True,"token":token}
    else:
        return {"code":"LOGIN_SUCCESSFUL_UNVERIFIED","success":True,"token":token}

#User preferences
@router.post("/user/preferences")
@limiter.limit("10/minute")
async def change_preferences(request: Request, preferences:Preferences, user = Depends(get_current_user)):
    try:
        item = preferences.model_dump()
        collection_users.update_one(
            {"email": user["user_data"]["email"]},
            {
                "$set": {"preferences":item},
            }
            )
        return {"code":"PREFERENCES_CHANGED","success":True}
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

# *** Endpoint ment for admins ***

# Validate and register new tags
@router.post("/fanArt/tags/validation")
@limiter.limit("10/minute")
async def tags_validation(request: Request, tags: List[Tags],toDelete: List[str] = Query(...), user = Depends(get_current_user)):
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}

    try: 
        items = []
        for tag in tags:
            items.append(tag.model_dump())

        # Deletes the tags
        collection_name.delete_many({"name":{"$in":toDelete}})

        # Adds or accept the validating tags
        tagNames = []
        for tag in items:
            tagNames.append(tag["name"])

        existing = list_serial(collection_name.find({"name":{"$in":tagNames}}))
        toValidateNames = []
        addedByAdmin = []
        for tag in existing:
            toValidateNames.append(tag["name"])
        for tag in items:
            if toValidateNames.count(tag["name"]) == 0:
                addedByAdmin.append(tag)
        # Validate / accept new tags
        collection_name.update_many({"name":{"$in":toValidateNames}}, {"$set":{"status":"accepted"}})

        if len(addedByAdmin) >= 1:
            collection_name.insert_many(addedByAdmin)

        return {"code":"TAGS_VALIDATED","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

# To validate/edit a fanArt
@router.post("/fanArt/validate")
@limiter.limit("10/minute")
async def validate_fanArt(request: Request, fanArt: FanArtWithId, user = Depends(get_current_user)):
    item = fanArt.model_dump()
    print("tutut",item)
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}
    
    try:
        collection_fanArts.update_one({"_id": ObjectId(item["id"])},{"$set":{"status":"accepted","clasification":item["clasification"],"tags":item["tags"],"artists":item["artists"],"caracters":item["caracters"]}})
        return{"code":"FANART_EDITED","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

# To reject a fanArt
@router.post("/fanArt/reject")
@limiter.limit("10/minute")
async def reject_fanart(request: Request, background_tasks: BackgroundTasks, motives:RejectionMotivesAndId,toDelete: List[str] = Query(...), user = Depends(get_current_user)):
    item = motives.model_dump()
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}

    try:
        # Reject pending tags
        collection_name.update_many({"name":{"$in":toDelete},"status":"pending"},{"$set":{"status":"rejected"}})
        # Get user data
        fanart = collection_fanArts.find_one({"_id":ObjectId(item["FanArtId"])})
        collection_fanArts.update_one({"_id":ObjectId(item["FanArtId"])},{"$set":{"status":"rejected"}})
    
        username = fanart["uploader"]["username"]
        user_fanArt = collection_users.find_one({"userName":username})
        if(user_fanArt):
            lang = user_fanArt["preferences"]["language"]

            # Build message of the email
            message = translations.get(lang, translations[settings_internalization.default_locale])["fan_art_rejection_motive_body"]
            if(item["incorrectLink"]):
                message += " " + translations.get(lang, translations[settings_internalization.default_locale])["fan_art_rejection_motive_link"]
            if(item["lowResolution"]):
                message += " " + translations.get(lang, translations[settings_internalization.default_locale])["fan_art_rejection_motive_resolution"]
            if(item["artistIssue"]):
                message += " " + translations.get(lang, translations[settings_internalization.default_locale])["fan_art_rejection_motive_artist"]
            if(item["noYuyuko"]):
                message += " " + translations.get(lang, translations[settings_internalization.default_locale])["fan_art_rejection_motive_tutuko"]

            background_tasks.add_task(send_email_rejection_motive, user_fanArt["email"], message, translations.get(lang, translations[settings_internalization.default_locale])["subject_fan_art_rejection"])
    
        return{"code":"FANART_REJECTED","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

@router.get("/admin/fanArt/{num}")
@limiter.limit("60/minute")
async def get_to_validate_fanarts(request: Request, num:int, user = Depends(get_current_user)):
    if(user):
        fanArts = list_serial_fanArts(collection_fanArts.find({"status":"pending"}).skip((num-1)*5).limit(6))
        return fanArts
    
@router.get("/admin/unverified_tags")
@limiter.limit("90/minute")
async def get_unverified_tags(request: Request, tags: List[str] = Query(...), user = Depends(get_current_user)):
    if(user["user_data"]["role"] == "Admin"):
        unver_tags = list_serial(collection_name.find({"name":{"$in":tags}, "status":"pending"}))
        ver_tags = list_serial(collection_name.find({"name":{"$in":tags}, "status":"accepted"}))
        return {"unverified_tags":unver_tags,"verified_tags":ver_tags}
    else:
        return {"unverified_tags":None,"verified_tags":None}

# *** User experience ***

#Get user data from the token
@router.get("/profile")
def profile(user = Depends(get_current_user)):
    return user

@router.get("/tags")
@limiter.limit("120/minute")
async def show_accepted_tags(request: Request, num: int, numberTags:int, search: str | None = None):
    if not search:
        tags = list_serial(collection_name.find({"status":"accepted"}).skip((num-1)*numberTags).limit(numberTags + 1))
    else:
        tags = list_serial(collection_name.find({"status":"accepted","name":{"$regex": search, "$options": "i"} }).skip((num-1)*numberTags).limit(numberTags + 1))
    return tags
    
@router.get("/tags/check")
@limiter.limit("60/minute")
async def does_tag_already_exists(request: Request, newTag: str):
    tag = collection_name.find_one({"name":newTag, "status":"accepted"})
    if not tag:
        return {"code":"TAG_DOES_NOT_EXISTS","success":True}
    else:
        return {"code":"TAG_ALREADY_EXISTS","success":False}

@router.post("/newTags")
@limiter.limit("5/minute; 75/day")
async def post_new_tags(request: Request, tags: List[Tags], user = Depends(get_current_user)):
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}
    
    try:
        items = []
        for tag in tags:
            items.append(tag.model_dump())

        tagNames = []
        for tag in items:
            tagNames.append(tag["name"])

        repited = list_serial(collection_name.find({"name":{"$in":tagNames}}))
        repited_without_id = []
        for singular_repited in repited:
            del singular_repited["id"]
            repited_without_id.append(singular_repited)

        for repitedTag in repited_without_id:
            items.remove(repitedTag)
    
        collection_name.insert_many(items)
        return {"code":"TAGS_ADDED","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

@router.post("/tags/validate")
@limiter.limit("5/minute; 75/day")
async def validate_tag(request: Request, tags: List[str], user = Depends(get_current_user)):
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}
    
    try:
        result = collection_name.update_many({"status":"pending","name":{"$in":tags}},{"$set":{"status":"accepted"}})
        return {"code":"TAGS_VALIDATED","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False, "modified":result}
    
@router.post("/upload-image")
@limiter.limit("5/minute; 75/day")
async def upload_image(request: Request, file: UploadFile = File(...), user = Depends(get_current_user)):
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}

    try:
        await file.seek(0)

        file.file.seek(0,2)
        file_size = file.file.tell()
        file.file.seek(0)

        ALLOWED_TYPES = {
            "image/jpeg",
            "image/png",
            "image/webp"
        }

        if file.content_type not in ALLOWED_TYPES:
            return {"code":"INCORRECT_FILE_TYPE","success":False, "url":None}

        if file_size > (5 * 1024 * 1024):
            return {"code":"MAX_LIMIT_EXCEDED","success":False, "url":None}

        result = cloudinary.uploader.upload(file.file)

        return {"code":"IMAGE_UPLOAD_SUCCESSFUL","success":True, "url":result["secure_url"]}

    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False, "url":None}

@router.post("/newFanArt")
@limiter.limit("5/minute; 75/day")
async def post_new_fanArt(request: Request, fanArt: FanArts, user = Depends(get_current_user)):
    if user["success"] == False:
        return {"code":"INVALID_TOKEN","success":False}
    try:
        item = fanArt.model_dump()
        collection_fanArts.insert_one(item)
        return {"code":"CREATED_FANART","success":True}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False}

@router.get("/fanArts/tags/{num}")
@limiter.limit("120/minute")
async def get_fanArtsByTags(request: Request, num:int,tags: List[str] = Query(...),user: Optional[str] =  Depends(get_optional_user)):
    try:
        search = {"clasification": {"$nin":["Explicit"]}, "status":"accepted"}
        if user["success"]:
            userPreferences = user["user_data"]["preferences"]
            
            #If user does not wants explicit
            if userPreferences["showExplicit"]:
                del search["clasification"] 
            #Eliminate all tags to hide
            if len(userPreferences["hideTags"]) >=1:
                set_search_tags(search,userPreferences["hideTags"],"$nin")
        if(tags[0] == ""):
            fanArts = list_serial_fanArts(collection_fanArts.find(search).skip((num-1)*8).limit(9))
            return {"code":"FANARTS_COLLECTED","success":True, "fanArts":fanArts}

        tagList = list_serial(collection_name.find({"name":{"$in":tags}}))
        set_search_tags(search,tagList,"$all")
        print("Preferences",search)
      
        fanArts = list_serial_fanArts(collection_fanArts.find(search).skip((num-1)*8).limit(9))
        return {"code":"FANARTS_COLLECTED","success":True, "fanArts":fanArts}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False, "fanArts":None}

@router.get("/manga")
@limiter.limit("120/minute")
async def get_manga(request: Request, num:int,name:str, page:int | None = None, chapter:int | float | None = None, vol:int | None = None, lot:int = 10):
    try:
        search = {"name": name}
        if page:
            search["page"] = page
        if chapter:
            search["chapter"] = chapter
        if vol:
            search["vol"] = vol

        pages = list_serial_mangas(collection_mangas.find(search).sort([("chapter",1),("page",1)]).skip((num-1)*lot).limit(lot + 1))

        next = len(pages) > lot

        if next:
            pages = pages[:lot]

        return {"code":"PAGES_COLLECTED","success":True, "next": next, "pages":pages}
    
    except Exception:
        return {"code":"UNEXPECTED_ERROR","success":False, "next": next, "pages":None}

@router.get("/manga/data")
async def get_manga_data(name:str, field:str):
    items = collection_mangas.distinct(field, {"name":name})
    return items
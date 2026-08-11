def individual_serial(tag) -> dict:
    return{
        "name": tag.get("name"),
        "category": tag.get("category"),
        "status":tag.get("status")
    }

def list_serial(tags) -> list:
    return[individual_serial(tag) for tag in tags]

def individual_serial_fanArts(fanArt) -> dict:
    return{
        "id": str(fanArt["_id"]),
        "src": fanArt.get("src"),
        "tags": fanArt.get("tags"),
        "artists": fanArt.get("artists"),
        "caracters": fanArt.get("caracters"),
        "clasification": fanArt.get("clasification"),
        "show": fanArt.get("show"),
        "originalLink": fanArt.get("originalLink"),
        "status": fanArt.get("status"),
        "uploader": fanArt.get("uploader")
    }

def list_serial_fanArts(fanArts) -> list:
    return[individual_serial_fanArts(fanArt) for fanArt in fanArts]

def individual_serial_user(user) -> dict:
    return{
        "id": str(user["_id"]),
        "userName": user.get("userName"),
        "role": user.get("role"),
        "email": user.get("email"),
        "verified": user.get("verified"),
    
        "verification_token": user.get("verification_token"),
        "reset_password_token": user.get("verification_token"),

        "preferences":{
            "language":user.get("preferences",{}).get("language"),
            "showExplicit":user.get("preferences",{}).get("showExplicit"),
            "hideTags":[{
                "name": tag.get("name"),
                "category": tag.get("category"),
            } for tag in user.get("preferences",{}).get("hideTags",[])]
        } if user.get("preferences") else None
    }

def list_serial_user(users) -> list:
    return[individual_serial_user(user) for user in users]

def individual_serial_mangas(mangas) -> dict:
    return {
        "id": str(mangas["_id"]),
        "name": mangas.get("name"),
        "vol": mangas.get("vol"),
        "chapter": mangas.get("chapter"),
        "page": mangas.get("page"),
        "translator_group": mangas.get("translator_group"),
        "src": mangas.get("src")
    }

def list_serial_mangas(mangas) -> list:
    return[individual_serial_mangas(manga) for manga in mangas]
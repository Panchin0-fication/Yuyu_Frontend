from pydantic import BaseModel, EmailStr, Field

class Tags(BaseModel):
    name: str
    category: str
    status:str

class Uploader(BaseModel):
    username:str
    id:str

class FanArts(BaseModel):
    src: str
    tags: list = []
    artists: list = []
    caracters: list = []
    clasification: str
    show: bool
    originalLink: str
    status: str
    uploader: Uploader

class FanArtWithId(FanArts):
    id: str

class RejectionMotivesAndId(BaseModel):
    FanArtId: str
    incorrectLink: bool
    lowResolution: bool
    artistIssue: bool
    noYuyuko: bool

class SimpleTag(BaseModel):
    name: str
    category: str

class Preferences(BaseModel):
    language: str = "en"
    showExplicit: bool = False
    hideTags: list[SimpleTag] = Field(default_factory=list)

class User(BaseModel):
    userName:str
    password:str
    role:str
    email:EmailStr 
    verified:bool
    verification_token:str 
    preferences: Preferences

class MangaPage(BaseModel):
    name:str
    vol:int
    chapter:int | float
    page:int
    translator_group:str
    src:str
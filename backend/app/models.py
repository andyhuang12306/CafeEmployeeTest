from pydantic import BaseModel

class Employee(BaseModel):
    id: str | None=None
    name: str
    email: str
    phoneNumber: str
    gender: str
    cafeId: str | None=None
    cafe: str
    startDate: str | None=None
    endDate: str | None=None


class Cafe(BaseModel):
    id: str | None=None
    name: str
    description: str
    location: str
    employees: int | None=0
    logoStr: str | None=None
    logoPath: str | None=None
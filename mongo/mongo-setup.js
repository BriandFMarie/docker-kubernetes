db = db.getSiblingDB('dockerdb-prod')
db.vote.insert({"voteDogs": 0, "voteCats": 0})

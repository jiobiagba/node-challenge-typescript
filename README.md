# node-challenge-typescript
Redoing refactoring MyDoc's API challenge using TypeScript - My 3 - day chalenge!!!

Base URL here is: https://mydoc-ts.herokuapp.com/

POST, GET, and GET with timestamp done in the main challenge also work with this base url.

New adjustments after feedback from Amit Giri (MyDoc) yesterday:
1) To get timestamp, the query format has been implemented (<baseurl>/api/v1/object/:mykey?timestamp=<timestamp_value>
2) Getting a certain timestamp no longer stores the entire result in memory
3) CORS config has been set to allow access from only localhost:9099
  
Thanks Amit!!!

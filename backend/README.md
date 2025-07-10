# Knitting Row Counter Backend
A Go application that implements a RESTful API for a row counter app for knitting.

## Endpoints
`/login/`:
- `POST`: Authenticate the user.

`/counters/`:
- `POST`: Create a new rowcounter. Requires the user to be logged in.
- `PUT`: Update the rowcounter with the given ID. Requires the user to be logged in.
- `GET`: Get all rowcounters of the currently logged in user.

`/counters/:id`:
- `GET`: Get the rowcounter with the given ID. Requires the user to be logged in.
- `DELETE`: Delete the rowcounter with the given ID. Requires the user to be logged in.

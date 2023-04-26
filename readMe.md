# Air Ticket Booking API

## Endpoints

### POST /api/register

This endpoint allows users to register.

#### Response

```
Status: 201 Created
```

### POST /api/login

This endpoint allows users to login.

#### Response

```
Status: 201 Created
```

### GET /api/flights

Retrieves information about list of available flights.

#### Response

```
Status: 200 OK
```

### GET /api/flights/:id

Retrieves information about details of specific flight by its id.

#### Parameters

 - id (required): The ID of the flight to retrieve.

#### Response

```
Status: 200 OK
```

### POST /api/flights

Adds new flight to the system.

#### Response

```
Status: 201 Created
```

### PATCH /api/flights/:id

Allows users to update the details of a specific flight identified by its ID.

#### Parameters

 - id (required): The ID of the flight to retrieve.

#### Response

```
Status: 204 No Content
```

### DELETE /api/flights/:id

Allows users to delete the details of a specific flight identified by its ID.

#### Parameters

 - id (required): The ID of the flight to retrieve.

#### Response

```
Status: 202 Accepted
```

### POST /api/booking

Allows the user to book flights.

#### Response

```
Status: 201 Created
```

### GET /api/dashboard

Retrieves list all the bookings so far with the user and flight details

#### Response

```
Status: 200 Ok
```
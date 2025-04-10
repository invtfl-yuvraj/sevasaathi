### Run app: 

```npm run dev```

```npx prisma generate```
```npx prisma migrate dev --name "any name" ```

``` npx prisma studio ```

## API Endpoints

### Workers
- **PATCH /api/workers/acceptBooking**  
  Assigns a captain to a booking and updates the booking status to "CONFIRMED".  

  **Request Body:**  
  ```json
  {
    "captainId": "string",
    "bookingId": "string"
  }
  ```

  **Example Input:**  
  ```json
  {
    "captainId": "12345",
    "bookingId": "67890"
  }
  ```

  **Example Output (Success):**  
  ```json
  {
    "success": true,
    "message": "Captain assigned successfully",
    "booking": {
      "id": "67890",
      "captainId": "12345",
      "status": "CONFIRMED",
      "...otherBookingFields": "..."
    }
  }
  ```

  **Responses:**  
  - `200 OK`: Captain assigned successfully.  
  - `400 Bad Request`: Missing `captainId` or `bookingId`.  
  - `404 Not Found`: Booking not found.  
  - `500 Internal Server Error`: Unexpected server error.

----------------------------------------------------------------------------

- **GET /api/workers/fetchBookings**  
  Fetches all pending bookings sorted by creation date (newest first).

  **Request:**  
  No request body needed. Simple GET request.

  **Example Output (Success):**  
  ```json
  {
    "success": true,
    "message": "Bookings fetched successfully",
    "bookings": [
      {
        "id": "1234",
        "status": "PENDING",
        "createdAt": "2025-04-11T10:00:00Z",
        "...otherBookingFields": "..."
      },
      {
        "id": "5678",
        "status": "PENDING",
        "createdAt": "2025-04-11T09:00:00Z",
        "...otherBookingFields": "..."
      }
    ]
  }
  ```

  **Responses:**  
  - `200 OK`: Bookings fetched successfully.
  - `500 Internal Server Error`: Unexpected server error.


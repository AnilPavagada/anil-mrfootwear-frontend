# MR Footwear Spring Boot Backend

Local development uses H2. Set PostgreSQL environment variables to use PostgreSQL.

## Run locally

```powershell
.\mvnw.cmd spring-boot:run
```

The API runs at `http://localhost:8080`.

## API endpoints

- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/{id}`
- `DELETE /api/categories/{id}`
- `GET /api/products?category=All%20Collections&search=`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `POST /api/products/{id}/image`
- `GET /api/products/{id}/image`
- `DELETE /api/products/{id}`
- `GET /api/gallery`
- `POST /api/gallery`
- `GET /api/gallery/{id}/image`
- `DELETE /api/gallery/{id}`
- `GET /api/reviews?approvedOnly=false`
- `POST /api/reviews`
- `PUT /api/reviews/{id}/status?status=APPROVED`

## PostgreSQL

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/mrfootwear"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="your-password"
$env:SPRING_DATASOURCE_DRIVER_CLASS_NAME="org.postgresql.Driver"
.\mvnw.cmd spring-boot:run
```

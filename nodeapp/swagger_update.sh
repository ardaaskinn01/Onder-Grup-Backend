#!/bin/bash

# SwaggerHub API URL
SWAGGERHUB_API_URL="https://api.swaggerhub.com/apis/ARDAASKINDM/Onder-Lift/1.0.0?resolved=true"

# SwaggerHub API Key
API_KEY="a257439a-68fd-4ff2-abba-5220f0b92a4c"

# swagger.json dosya yolu
SWAGGER_JSON_PATH="/usr/src/app/swagger.json"

# SwaggerHub API'ye swagger.json dosyasını yükleme
curl -X PUT "$SWAGGERHUB_API_URL" \
-H "Authorization: Bearer $API_KEY" \
-H "Content-Type: application/json" \
-d @$SWAGGER_JSON_PATH
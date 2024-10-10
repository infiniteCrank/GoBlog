# GoBlog
this is a blog using golang and vanilla javascript 

# file structure
\/blog-platform\
  ├── \/frontend\
  │   ├── index.html\
  │   ├── app.js\
  │   └── styles.css\
  └── \/backend\
      ├── main.go\
      └── middleware.go\
      
# install 

go mod init blog-platform
go get -u github.com/gorilla/mux
go get -u github.com/dgrijalva/jwt-go // or github.com/golang-jwt/jwt

package main

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
)

var posts []Post

type Post struct {
    Title     string `json:"title"`
    Content   string `json:"content"`
    IsPrivate bool   `json:"isPrivate"`
}

// Initialize posts slice
func init() {
    posts = []Post{}
}

func getPostsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(posts)
}

func createPostHandler(w http.ResponseWriter, r *http.Request) {
    var post Post
    if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    posts = append(posts, post)
    w.WriteHeader(http.StatusCreated)
}

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/api/posts", getPostsHandler).Methods("GET")
    router.HandleFunc("/api/posts", createPostHandler).Methods("POST")

    // Add your authentication middleware here
    // router.Use(authMiddleware)

    http.ListenAndServe(":8080", router)
}

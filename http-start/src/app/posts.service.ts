import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService{
  error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
    
    const postData: Post = {title: title, content: content};

    this.http
      .post<{name: string}>(
        'https://http-start-21c7e-default-rtdb.firebaseio.com/posts.json', 
          postData,
          {
            observe: 'response'
          }
        )
        .subscribe(
      respnseData => {
        console.log(respnseData);
      }, error => {
        this.error.next(error.message);
      });
    }

    fetchPosts(){
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
      return this.http
          .get<{ [key: string]: Post }>(
            'https://http-start-21c7e-default-rtdb.firebaseio.com/posts.json', 
            {
              headers: new HttpHeaders({"Custom-Header": 'Hello'}),
              // params: new HttpParams().set('print', 'pretty')
              params: searchParams, 
              responseType: 'json'
            }
          )
          .pipe(
              map(responseData => {
                  const postsArray: Post[] = [];
                  for (const key in responseData) {
                      if (responseData.hasOwnProperty(key)){
                      postsArray.push({...responseData[key], id: key})
                      }
                  }
                  return postsArray;
              }),
              catchError(errorRes => {
                  // Send to analytics server
                  return throwError(errorRes);
              })
          );
    }

    deletePosts(){
        return this.http.delete('https://http-start-21c7e-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events', 
          responseType: 'text'
        }
        ).pipe(tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response){
            console.log(event.body);
          }
        })
        );
    }
}
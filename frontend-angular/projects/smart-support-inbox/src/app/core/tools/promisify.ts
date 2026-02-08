import { Observable } from "rxjs";

export function toPromise<T>(obs: Observable<T>) {
  return new Promise<T>((res, rej) => {
    obs.subscribe({
     next(value) {
       res(value);
     },
     error(err) {
       rej(err);
     },
   });
  });
}

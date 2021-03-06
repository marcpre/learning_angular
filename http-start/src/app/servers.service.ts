import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable()
export class ServerService {
    constructor(private http: Http) {}
    storeServers(servers: any[]) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        })
        /*
        return this.http.post('https://udemy-ng-http-6cea2.web.app/databases/data/documents/data.json', 
            servers, 
            {headers: headers}
        )*/
        return this.http.put('https://udemy-ng-http-6cea2.web.app/databases/data/documents/data.json', 
            servers, 
            {headers: headers}
        )
    }

    getServers() {
        return this.http.get('https://udemy-ng-http-6cea2.web.app/data')
            .pipe(map(
                (response: Response) => {
                    const data = response.json()
                    for (const server of data) {
                        server.name = 'FETCHED_' + server.name
                    }
                    return data
                }
            ).catch((error: Response) => {
                return Observable.throw('Something went wrong.')
            }
        ))
    }
}
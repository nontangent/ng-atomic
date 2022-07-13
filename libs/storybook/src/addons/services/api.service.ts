import axios from 'axios';
import { from, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export class HttpClient {
  private baseUrl = '';

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  buildUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  get<T>(url: string): Observable<T> {
    return from(axios.get(this.buildUrl(url))).pipe(pluck('data'));
  }

  post<T>(url: string, data: object = {}): Observable<T> {
    return from(axios.post(this.buildUrl(url), data)).pipe(pluck('data'));
  }
}

export class ApiService {
  private static _instance: ApiService;
  static get instance(): ApiService {
    return (this._instance ??= new ApiService());
  }

  private http = new HttpClient();

  constructor() {
    this.http.setBaseUrl('http://localhost:3333/api');
  }

  generate({ type, name }: { type: string; name: string }): Promise<string> {
    const endpoint = `/ng/g/${type}`;
    return this.http
      .post<string>(endpoint, { name })
      .toPromise();
  }
}

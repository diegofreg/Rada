import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataFormService {


  constructor(private http: HttpClient) { }

  storeClient(cpfCnpj: string): Observable<any> {
    // JSON.parse ( this.http.get(`http://localhost:8080/rada-laboratorios/pessoa/buscarPessoaPorCpfCnpj/${cpfCnpj}`))
    const helper = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

     
    const headers= new HttpHeaders (helper)

    

     return this.http.get(`http://localhost:8080/rada-laboratorios/pessoa/buscarPessoaPorCpfCnpj/${cpfCnpj}`)
    // return this.http.get(`http://localhost:8080/rada-laboratorios/pessoa/buscarPessoaPorCpfCnpj/${cpfCnpj}`,headers)
    // return this.httpClient.get<Type>(url, { responseType: "json" });
  }


  }


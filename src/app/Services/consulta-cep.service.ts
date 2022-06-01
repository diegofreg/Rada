import { Injectable } from '@angular/core';
import { Client } from 'src/models/client';

import { HttpService } from './http.service';



interface AddressI{

  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  
}




@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  storeClient(client: Client) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpService) { }

   

  public getAddress(cep: string) {
    return this.http.get<AddressI>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  

}

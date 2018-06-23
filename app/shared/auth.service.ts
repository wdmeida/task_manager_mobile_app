import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { TokenService } from "./token.service";

import { User } from "./user.model";

@Injectable()

export class AuthService {
  public constructor(private tokenService: TokenService) {}

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any)
      .catch(this.handleErrors);
  }

  public singIn(uid: string, password: string): Observable<Response> {
    const signInData = { email: uid, password };

    return this.tokenService.signIn(signInData)
      .catch(this.handleErrors);
  }

  public signOut(): Observable<Response> {
    return this.tokenService.signOut()
      .catch(this.handleErrors);
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(error: Response) {
    console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return Observable.throw(error);
  }
}

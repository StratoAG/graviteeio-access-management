/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CertificateService } from "../services/certificate.service";

@Injectable()
export class CertificatesResolver implements Resolve<any> {

  constructor(private certificateService: CertificateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    let domainId = (route.parent.paramMap.get('domainId')) ? route.parent.paramMap.get('domainId') : route.parent.parent.paramMap.get('domainId')

    // try access domainId from higher levels
    if (!domainId && route.parent.parent.parent) {
      domainId = route.parent.parent.parent.paramMap.get('domainId');
    }
    return this.certificateService.findByDomain(domainId);
  }

}

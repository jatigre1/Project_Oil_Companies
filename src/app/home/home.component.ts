import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/servicies/http.service';
import { APIResponse, oil_companies } from '../models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public sort!: string;
  public oil_companies!: Array<oil_companies>;
  gameSub: any;
  router: any;

  constructor(
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute
    ){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) =>{ 
      if (params['game-search']) {
        this.searchGames('metacritic', params['game-search']);
      } else {
        this.searchGames('metacritic');
      }
    });
  }
  searchGames(sort: string, search?: string): void{
    this.gameSub = this.httpService
      .getCompanyList(sort, search)
      .subscribe((CompanyList: APIResponse<oil_companies>) => {
        this.oil_companies = CompanyList.results;
        console.log(CompanyList);
      });
  }


}

import { RatingService } from './rating.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { ArtworkService } from '../artwork-detail/artwork.service';
import { Component, Input, OnInit } from '@angular/core';
import { Rating } from './../../shared/model/rating.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html' ,
  styleUrls: ['./rating.component.css'],
  providers: [RatingService]
})
export class RatingComponent implements OnInit {

  constructor(private ratingService :RatingService, private authenticationService : AuthenticationService) {
  }
  @Input()
  set artworkId(artworkId: number) {
    this.artId =artworkId;
  }

  isAuthenticated: any;
  myRating: number=0;
  artId : number;
  private  starRated: string ='star-rated glyphicon glyphicon-star cursorPointer';
  private starNotRated : string =' glyphicon glyphicon-star cursorPointer';
  averageRating : number;

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuth;
    this.subscribeAuth();
    this.initRating();
  }

  // subscribe to the isAuthenticated observable
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        if(isAuthenticated) this.getMyrating();
        this.isAuthenticated = isAuthenticated;
      });
    }
  rate(rating : number) : void{
    if(this.isAuthenticated){
      this.ratingService.rate(rating,this.artId).subscribe(res=>{
            this.myRating = rating;
            this.averageRating = res;
      });
    }
  }

  initRating(){
    this.getAvgRating();
    if(this.isAuthenticated){
      this.getMyrating();
    }

  }

  getAvgRating() : void{
      this.ratingService.getAvgRating(this.artId).subscribe(res=>{
        this.averageRating = res;
      })
  }
  
  getMyrating() : void{
      this.ratingService.getMyrating(this.artId).subscribe(res=>{
        this.myRating = res;
      })
  }

}

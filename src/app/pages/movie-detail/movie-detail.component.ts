import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute
  ) {}

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result);
      this.getMovieDetailResult = result;
    });
  }
  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }
  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }
}

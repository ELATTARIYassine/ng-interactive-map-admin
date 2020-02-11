import { Component, OnInit } from '@angular/core';
import { Place } from '../_model/place';
import { PlaceService } from '../_services/marker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-markers',
  templateUrl: './list-markers.component.html',
  styleUrls: ['./list-markers.component.scss']
})
export class ListMarkersComponent implements OnInit {

  places: Place[] = [];
  constructor(private placeService: PlaceService, private router: Router) { }

  ngOnInit() {
    this.getAllPlaces();
  }

  getAllPlaces(){
    this.placeService.findAll().subscribe(res => {
      console.log(res);
      this.places = res;
    });
  }

  deleteMarker(place: Place){
    this.placeService.deletePlace(place.id).subscribe(res=>{
      console.log(res);
      this.places.splice(this.places.indexOf(place), 1);
    });
  }

  updatePlace(place: Place){
    this.placeService.setter(place);
    this.router.navigate(['op']);
  }
  newUser(){
    let user = new Place();
    this.placeService.setter(user);
    this.router.navigate(['op']);
  }

}

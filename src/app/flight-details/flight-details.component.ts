import { Component, OnInit } from '@angular/core';
import Flights from "../../../public/flights.json";
import FlightDisplayData from '../_model/flight.model';

@Component({
  selector: 'app-fligh-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  website : any[] = []
  constructor() {}

  ngOnInit(): void {
    console.log(Flights);
    Flights.itineraries.forEach(Company => {
      Company.legs.forEach(leg => {
        let flightDisplayData: FlightDisplayData = {
          startTiming: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["departure_time"],
          endTiming: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["arrival_time"],
          startLocation: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["departure_airport"],
          endLocation: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["arrival_airport"],
          duration: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["duration_mins"],
          type: Flights.legs[Flights.legs.findIndex(x => x.id == leg)]["stops"],
        }

        let refactoredData = this.refactorData(flightDisplayData)
        console.log(refactoredData)
        let cardData = [Company.agent, Company.price, refactoredData]
        this.website.push(cardData)
      });
    });
  }

  refactorData(flightData: FlightDisplayData): FlightDisplayData{
    flightData.startTiming = flightData.startTiming.split("T")[1]
    flightData.endTiming = flightData.endTiming.split("T")[1]
    flightData.duration = Math.floor(Number(flightData.duration)/60)+":"+Number(flightData.duration)%60
    switch(Number(flightData.type)){
      case 0: flightData.type = "Direct"
        break;
      case 1: flightData.type = "1 Stop"
        break;
      default: flightData.type = flightData.type+" Stops"
        break;
    }
    return flightData;
  }
}

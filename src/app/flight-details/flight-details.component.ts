import { Component, OnInit } from '@angular/core';
import Flights from '../../../public/flights.json';
import FlightDisplayData from '../_model/flight.model';

@Component({
  selector: 'app-fligh-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  website: any[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log(Flights);
    Flights.itineraries.forEach(Company => {
      const dataset = [];
      Company.legs.forEach(leg => {
        const rawDataFile = Flights.legs[Flights.legs.findIndex(x => x.id === leg)];
        const flightDisplayData: FlightDisplayData = {
          id: rawDataFile.airline_id,
          startTiming: rawDataFile.departure_time,
          endTiming: rawDataFile.arrival_time,
          startLocation: rawDataFile.departure_airport,
          endLocation: rawDataFile.arrival_airport,
          duration: rawDataFile.duration_mins,
          type: rawDataFile.stops
        };
        const refactoredData = this.refactorData(flightDisplayData);
        dataset.push(refactoredData);
      });
      const price = Company.price;
      const agent = Company.agent;
      const cardData = {agent, price, airlineData: dataset};
      this.website.push(cardData);
    });
  }

  refactorData(flightData: FlightDisplayData): FlightDisplayData{
    flightData.startTiming = flightData.startTiming.split('T')[1];
    flightData.endTiming = flightData.endTiming.split('T')[1];
    flightData.duration = Math.floor(Number(flightData.duration) / 60) + 'h ' + Number(flightData.duration) % 60;
    switch (Number(flightData.type)){
      case 0:
      flightData.type = 'Direct';
      break;
      case 1:
      flightData.type = '1 Stop';
      break;
      default:
      flightData.type = flightData.type + ' Stops';
      break;
    }
    flightData.id = 'https://logos.skyscnr.com/images/airlines/favicon/' + flightData.id + '.png';
    return flightData;
  }
}

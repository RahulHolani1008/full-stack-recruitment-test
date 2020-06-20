import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export default class FlightDisplayData{
    startTiming: string
    endTiming: string
    startLocation: string
    endLocation: string
    duration: string
    type: string
}
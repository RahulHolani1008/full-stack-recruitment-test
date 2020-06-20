import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export default class FlightDisplayData{
    id: string
    startTiming: string
    endTiming: string
    startLocation: string
    endLocation: string
    duration: string
    type: string
}
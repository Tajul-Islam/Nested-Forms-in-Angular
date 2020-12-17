import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Nested Forms';
  form: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.form = this.fb.group({
      team: this.fb.array([])
    });
  }

  onAddTeam(){
    (this.form.controls.team as FormArray).push(this.getNewHeaderColumn());
  }

  onRemoveTeam(i){
    (this.form.controls.team as FormArray).removeAt(i);
  }

  onRemovePlayer(i,j){
    (((this.form.controls.team as FormArray).controls[i] as FormGroup).controls.player as FormArray).removeAt(j);
  }

  getNewHeaderColumn(){
    return this.fb.group({
      teamName: new FormControl(''),
      player: this.fb.array([
      ])
    });
  }

  getPlayerContent(){
    return this.fb.group({
      playerName: '',
      playerPosition: ''
    });
  }

  onAddPlayer(index){
    (((this.form.controls.team as FormArray).controls[index] as FormGroup).controls.player as FormArray).push(this.getPlayerContent());
  }

  onSubmit(){
    console.log(this.form.value);
  }
}

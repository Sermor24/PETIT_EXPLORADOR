import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitexploradorComponent } from './petitexplorador.component';

describe('PetitexploradorComponent', () => {
  let component: PetitexploradorComponent;
  let fixture: ComponentFixture<PetitexploradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetitexploradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetitexploradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-petitexplorador',
  standalone: true,
  imports: [],
  templateUrl: './petitexplorador.component.html',
  styleUrl: './petitexplorador.component.css'
})
export class PetitexploradorComponent {
  constructor(private router: Router) { }

  redirectToApp() {
    window.location.href = '../../../assets/Petit_Explorador/PetitExplorador/Index.html';
  }
}

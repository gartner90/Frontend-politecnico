import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 
  // Arreglo que contiene las tarjetas con los títulos e imágenes de especialidades médicas
  cards = [
    { title: 'Medicina General', image: 'stethoscope.png' },
    { title: 'Odontología', image: 'dentistry.png' },
    { title: 'Pediatría', image: 'pediatrics.png' },
    { title: 'Ortopedia', image: 'orthopedics.png' }
  ];
  // Arreglo que contiene las reseñas con la calificación y el comentario
  reviews = [
    { rating: 5, comment: 'Excelente app, muy fácil de usar y con información precisa. Me ayuda a llevar un control adecuado de mi salud. ¡La recomiendo al 100%!' },
    { rating: 4, comment: 'Me encanta esta aplicación. Tiene un diseño intuitivo y me permite gestionar mis citas y resultados médicos de manera rápida y segura. ¡Una herramienta esencial!' },
    { rating: 4.5, comment: 'Esta app ha sido muy útil para mi bienestar. Tiene recordatorios de medicamentos y seguimiento de mis consultas médicas. ¡Estoy muy satisfecha!' }
  ];
  // Función que convierte la calificación numérica en un arreglo de íconos de estrellas (completas, medias o vacías)
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('bi-star-fill'),
      ...Array(halfStar).fill('bi-star-half'),
      ...Array(emptyStars).fill('bi-star')
    ];
  }

}

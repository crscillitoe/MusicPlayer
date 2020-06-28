import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './music-list/music-list.component';

const routes: Routes = [
  {
    path: '',
    component: MusicListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

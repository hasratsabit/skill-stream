import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
} from '@angular/material';


const material: any[] = [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
]

@NgModule({
    imports: material,
    exports: material
})

export class MaterialModule {}
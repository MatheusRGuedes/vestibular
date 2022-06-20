import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ 
    name: 'cpfFormat' 
})
export class CpfPipe implements PipeTransform {
    
    transform(value: string|number, ...args: unknown[]) {
        let valorFormatado = value + '';

        // Addiciona 0 a esquerda sendo < 11
        // seleciona os 11 digitos
        // apaga caracter n numerico 
        // Adiciona formatação
        valorFormatado = valorFormatado
            .padStart(11, '0')                  
            .substring(0, 11)                   
            .replace(/[^0-9]/, '')              
            .replace(                           
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
            );

        return valorFormatado;
    }
}

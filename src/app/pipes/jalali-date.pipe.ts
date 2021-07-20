import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
    name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {
    transform(value: any, showTime: boolean = false, type = null): any {
        if (!value) { return ''; }
        const MomentDate = moment(value, 'YYYY/MM/DD');

        if ( !showTime ) {
            return MomentDate.locale('fa').format('DD MMMM, YYYY');
        }

        if ( type && type === 'sliceDate' )
        {
            return `
                ${MomentDate.locale('fa').format('YYYY-MM-DD')}
                <br />
                ${value.substr(10, 15)}
            `;
        } else {
            return MomentDate.locale('fa').format('YYYY-MM-DD') + value.substr(10, 15);
        }
    }
}

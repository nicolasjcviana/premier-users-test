import moment from 'moment';

export default class DateUtils {
    static formatDefault = 'DD/MM/YYYY';
    static formatServer = 'YYYY-MM-DD';

    static toServerDate(date) {
        return moment(date, DateUtils.formatDefault).format(DateUtils.formatServer);
    }

    static toDefaultDate(date) {
        return moment(date, DateUtils.formatServer).format(DateUtils.formatDefault);
    }

}
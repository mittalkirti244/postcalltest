using {BusinessPartner as BP} from './external/BusinessPartner';

service S4service{
    entity BusinessPartner as projection on BP.A_BusinessPartner;
}
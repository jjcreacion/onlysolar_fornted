export interface IUser {
    email:              string;
    password:           string;
    password2:          string;
    name:               string;
    middlename:         string;    
    lastname:           string;
    document:           number;
    numberss:           string;
    numbertax:          string;
    numberid?:          string;
    numberid2?:         string;
    phone:              string;
    hostcode:           string;
    profession:         string;
    desiredsalary:      number;
    convicted:          boolean;
    residence:          Residence;
    contact:            Contact;
    bankaccount:        Bankaccount;
    previousemployment: Previousemployment;
}

export interface Bankaccount {
    namebank:   string;
    rounting:   string;
    account:    string;
    percentage: string | number;
    imgcheck:   null;
}

export interface Contact {
    fullname:     string;
    relationship: string;
    address:      string;
    phone:        string;
}

export interface Residence {
    address: string;
    state:   string;
    city:    string;
    zipcode: number;
}

export interface Previousemployment{
    company:           string;
    phone:             string;
    address:           string;
    supervisor:        string;
    jobtitle:          string;
    starsalary:        number;
    endsalary:         number;
    startDate:         string;
    endDate:           string;
    responsabilities:  string;
    reasonleaving:     string;
    contactsupervisor: string;
}



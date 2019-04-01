import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
    selector: 'app-mentorship',
    templateUrl: './mentorship.component.html',
    styleUrls: ['./mentorship.component.css']
})

export class MentorshipComponent implements OnInit {
    // communicating with mentor checkboxes on and off switches
    inPersonBox = false;
    EmailBox = false;
    byPhoneBox = false;
    textBox = false;

    // what kind of mentee support needed checkboxes on and off switches
    mentalHealthBox = false;
    financialAdviceBox = false;
    careerAdviceBox = false;
    technicalBox = false;


    // variables to hold modals
    findMentorModal;
    blurredModal;
    becomeMentorModal;
    scheduleWithMentorModal;
    calendarModal;


    login: any;
    // mentors= [];


    newMentee:any = {};
    newMenteeErrors:any;

    // temp fake mentor data
    featuredMentors = [
        {
            "image": "profile_steve.png",
            "title": "Dr. Steve Weinrauch, BVMS, MRCVS",
            "position": "Founder, MightyVet",
            "description" : 
                `
                    Dr. Steve is a great resource for those interested in 
                    a veterinary industry career outside of practice. He is 
                    the founder of MightyVet, Co-Founder and Medical Director 
                    of 2nd Change Rescue, and Chief Veterinary Officer at 
                    Trupanion. He has published his research in numerous 
                    peer-reviewed journals and is licensed to practice in both 
                    the USA and the European Union. His wife is also a 
                    practicing veterinarian and both graduated from the 
                    Glasgow University School of Veterinary Medicine in 2005.
            `
        },
        {
            "image": "profile_kipperman.png",
            "title": "Barry Kipperman, BVMS, MRCVS, MSc",
            "position": "Veterinarian",
            "description" : 
                `
                    Dr. Kipperman is a practicing veterinarian and an academic. He is 
                    a great resource for those interested in research, academia, 
                    ethics, and career burnout. He recently published two scientific 
                    papers – one on the economic limitations of pet owners in the Journal 
                    of the American Veterinary Medical Association; the other on ethical 
                    dilemmas of veterinarians in Veterinary Record. He is a 1987 graduate 
                    of the University of Missouri College of Veterinary Medicine ...
                `
        },
        {
            "image": "profile_pope.png",
            "title": "Kimberly Pope-Robinson, DVM, CCFP",
            "position": "Founder, 1 Life Connected",
            "description" : 
                `
                    Founder of 1 Life Connected, Dr. Kimberly Pope-Robinson has served in 
                    the veterinary field for over 20 years. After graduating from the UC 
                    Davis School of Veterinary Medicine in 2000, she practiced in both 
                    large and small animal sectors. In 2007 Dr. Pope transitioned from 
                    running a single veterinary hospital to a leadership role where she
                     supported and managed multiple hospital locations. Dr. Pope later 
                     joined the veterinary pharmaceutical industry where she worked with 
                     veterinary specialists as well as veterinary schools.
                `
        },
        {
            "image": "profile_sonnya.png",
            "title": "Sonnya Dennis, DVM, DABVP",
            "position": "Practice Owner",
            "description" : 
                `
                    Dr. Sonnya Dennis graduated from the Virginia-Maryland Regional College
                     of Veterinary Medicine in 1995. Since 1996 she has been the owner and 
                     full-time veterinarian at Stratham-Newfields Veterinary Hospital. Dr. 
                     Dennis is Board-Certified in Canine and Feline Practice with the 
                     American Board of Veterinary Practitioners and is Chair of the AAHA
                      Veterinary Informatics Committee & Diagnostic Terms Editorial Board.
                       She is on the AAFP Hyperthyroid Guidelines Panel, President of the
                       Association for Veterinary...
                `
        },
        {
            "image": "profile_carrie.png",
            "title": "Carrie Jurney, DVM, DACVIM",
            "position": "NOMV Board Member Specialization: Neurology",
            "description" : 
                `
                    Founder of Jurney Veterinary Neurology, Dr. Jurney graduated 
                    summa cum laude from the University of Georgia, College of 
                    Veterinary Medicine in 2005. She was awarded her neurology
                     diplomate in 2009 and her Advanced Neurosurgery Certificate 
                     in 2011. She currently serves on the board of Not One More
                      Vet (NOMV). Her experiences on NOMV have led her to seek 
                      continuing education in mental health and suicide prevention, 
                      so she can better understand and be part of the solution 
                      for the veterinary mental health crisis.
                `
        },
        {
            "image": "profile_nicole.png",
            "title": "Nicole Blackmer-McArthur, DVM",
            "position": "NOMV Founder",
            "description" : 
                `
                    Dr. McArthur is a second-generation veterinarian who graduated 
                    from UC Davis School of Veterinary Medicine in 2001. Seeing a 
                    need for veterinarians to be able to communicate openly with their 
                    peers, Nicole started a secret Facebook group called Not One More 
                    Vet, an online veterinary support group that has grown to over 
                    15,000 veterinarian members. The group provides emotional, financial, 
                    and professional mental health support to its members.
                `
        },
        {
            "image": "profile_jason.png",
            "title": "Jason Sweitzer, DVM, RVT",
            "position": "NOMV Board Member & CFO | Founder Not One More Vet Student",
            "description" : 
                `
                    Dr. Sweitzer has worked in veterinary medicine for 18 years 
                    from kennel assistant, to RVT, to DVM. He graduated from UC 
                    Davis with his DVM in 2009 with focuses on small and exotic 
                    animals, behavior, and business management. He is the Intern 
                    Director at Conejo Valley Vet Hospital a 24/7 GP and ER hospital 
                    in Thousand Oaks, CA. His goals include bringing awareness to mental 
                    health issues within the profession, speaking about them with passion 
                    and humor, and empowering the profession to help address these critical issues.
                `
        },
        {
            "image": "profile_susie.png",
            "title": " Susie Superlongname, DVM",
            "position": "Role and title Organization Specialization",
            "description" : 
                `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac 
                    ut consequat semper viverra nam libero justo laoreet sit. Diam 
                    sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Ut ornare 
                    lectus sit amet est placerat in. Sollicitudin nibh sit amet commodo 
                    nulla facilisi nullam vehicula ipsum. Diam vel quam elementum 
                    pulvinar etiam non. Venenatis cras sed felis eget. Faucibus 
                    scelerisque eleifend donec pretium.
                `
        },
    ]



    constructor(
        private _UsersService: UsersService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }
    
    // gets all information we need when the page loads.
    ngOnInit() {
        // this.mentors = retrieveAllMentors();
        // this.featuredMentors = this.mentors[0-7];
        this.findMentorModal = document.getElementById("applyForMentorship");
        this.becomeMentorModal = document.getElementById("becomeAMentor");
        this.blurredModal = document.getElementById("blurryBackground");
        this.calendarModal = document.getElementById("calendar");
        this.newMentee={
            firstName:"",
            lastName:"",
            email:"",
            zipcode:"",
            titles:"",
            roles:"",
            organizations:""
          }
    }

    // switches the appropiate checked box on or off for searching later
    communicateBox(message: string){
        if (message === "In Person"){
            this.inPersonBox = !this.inPersonBox;
        } else if (message === "Email"){
            this.EmailBox = !this.EmailBox;
        } else if (message === "By Phone"){
            this.byPhoneBox = !this.byPhoneBox;
        } else if (message === "Text"){
            this.textBox = !this.textBox;
        }
    }

    // switches the appropiate checked box on or off for searching later
    supportBox(message:string){
        if (message === "Mental Health"){
            this.mentalHealthBox = !this.mentalHealthBox;
        } else if (message === "Financial Advice"){
            this.financialAdviceBox = !this.financialAdviceBox;
        } else if (message === "Career Advice"){
            this.careerAdviceBox = !this.careerAdviceBox;
        } else if (message === "Technical or Surgical"){
            this.technicalBox = !this.technicalBox;
        }
    }

    // action when form is submitted
    submit(){
        // this will keep all the form data
        // 
        // 
        // 


        // keeps track of boxes checked when submitted
        console.log( 
            [
                {"inPersonBox": this.inPersonBox}, 
                {"emailBox": this.EmailBox}, 
                {"byPhoneBox": this.byPhoneBox},
                {"textBox": this.textBox},
                {"mentalHealthBox": this.mentalHealthBox},
                {"financialAdiveBox": this.financialAdviceBox},
                {"careerAdviceBox": this.careerAdviceBox},
                {"technicalBox": this.technicalBox}
            ]
        );
        console.log(this.newMentee)


        // area that will eventually submit all data based on form input and checkboxes
        // 
        // 
        // 

        // closesModals once complete or will return an error

        this.closeModals()
        // 
        // 
        this.newMentee={
            firstName:"",
            lastName:"",
            email:"",
            zipcode:"",
            titles:"",
            roles:"",
            organizations:""
          }
    }

    // closes find a mentor modal
    closeModals(){
        this.findMentorModal.style.display = "none";
        this.blurredModal.style.display = "none";
        this.becomeMentorModal.style.display = "none";
        this.calendarModal.style.display = "none";
    }
    
    // opens blurred modal
    openMentoredModal(){
        this.findMentorModal.style.display = "block";
        this.blurredModal.style.display = "block";
    }
    openBecomeAMentor(){
        this.becomeMentorModal.style.display = "block";
        this.blurredModal.style.display = "block";
    }
    openCalendar(){
        this.calendarModal.style.display = "block";
        this.blurredModal.style.display = "block";
    }
    closeCalendar(){
        this.calendarModal.style.display = "none";
    }
    
    // clears form and then opens mentored modal a
    applyToBeMentored(){
        // clear from to make sure the form is empty when opened
        this.openMentoredModal();
    }
    applyToBeAMentor(){
        this.openBecomeAMentor();
    }





    /*
    retrieveAllMentors(){
        send request to service to get all mentors from database
        return mentors list 
    }

    searchBar(search_data){
        use a service to loop through for anything that matches the string
        elimante extra searches based on checkboxes
    }

    displayMentor(id){
        have modal pop up displaying all information with current user selected based on id 
    }

    scheduleWithMentor(){
        pop up menu of calendar to schedule with a mentor
    }

    findaMentor(){
        pull up full list of mentors???
    }

    */




}

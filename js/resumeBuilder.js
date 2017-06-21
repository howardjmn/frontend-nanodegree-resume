var model =
{
    defaultPlaceholder: "%data%",
    urlPlaceholder: "#",
    rowPlaceholder: "%row%",
    divClose: "</div>",

    subject: "Steven Miles",
    role: "Front-End Web Developer",

    bio:
    {
        "name" : this.subject,
        "role" : this.role,
        "contacts" :
        {
            "mobile" : "612 360 1087",
            "email" : "semiles@msn.com",
            "github" : "howardjmn",
            "twitter" : "",
            "location" : "Minneapolis"
        },
        "biopic" : "images/cover.jpeg",
        "welcomeMessage" : "Hello World!",
        "skills" : ["programming (java, HTML, javascript, css, php, sql)", "web design", "software testing"]
    },

    jobs:
    [
        {
            "title" : "Software Tester",
            "employer" : "Thomson Reuters",
            "url" : "http://thomsonreuters.com/en.html",
            "dates" : "2006 - 2014",
            "location" : "Eagan, MN",
            "description" : "developed automated test suites for Westlaw Next backend applications"
        },
        {
            "title" : "Software Developer",
            "employer" : "Target Corp.",
            "url" : "https://corporate.target.com/careers/career-areas/human-resources",
            "dates" : "1998 - 2006",
            "location" : "Minneapolis, MN",
            "description" : "developed web sites to allow internal users to track EDI documents, and external web sites to allow Target trading partners to set up EDI protocols."
        },
        {
            "title" : "Software Developer",
            "employer" : "3M Corp.",
            "url" : "http://www.3m.com/3M/en_US/company-us/",
            "dates" : "1991 - 1998",
            "location" : "St. Paul, MN",
            "description" : "Wrote code to translate EDI documents (such as Purchase Orders and Invoices) from formats sent by trading partners to formats used by 3M internal systems."
        }
    ],

    education:
    {
        "schools":
        [
            {
                "name" : "De Paul University",
                "location" : "Chicago, IL",
                "degree" : "Bachelor of Science",
                "majors" : ["Computer Science", "Mathematics"],
                "dates" : "1975 - 1979",
                "url" : "https://www.depaul.edu/Pages/default.aspx"
            }
        ],"onlineCourses":
        [
            {
                "title" : "Front-End Web Developer",
                "school" : "Udacity",
                "dates" : "2016",
                "url" : "https://classroom.udacity.com/nanodegrees/nd001/syllabus"
            }
        ]
    },

    projects:
    {
        "projects":
        [
            {
                "title" : "First Udacity Project - Hometown paper",
                "url": "https://htmlpreview.github.io/?https://github.com/howardjmn/HomeTown/blob/master/index.html",
                "dates" : "2016",
                "description" : "Sample newspaper webpage",
                "images" : ["images/city.png"]
            },
            {
                "title" : "Second Udacity Project - Portfolio",
                "url": "https://htmlpreview.github.io/?https://github.com/howardjmn/Portfolio/blob/master/index.html",
                "dates" : "2016",
                "description" : "Sample portfolio webpage",
                "images" : ["images/sunflower.png", "images/appify.png", "images/bokeh.png"]
            }
        ]
    }
};

var octopus =
{
    init: function()
    {
        bioView.init();
        workView.init();
        educationView.init();
        projectView.init();
    },

    getBio: function()
    {
        return model.bio;
    },

    getContacts: function()
    {
        return this.getBio().contacts;
    },

    getSkills: function()
    {
        return this.getBio().skills;
    },

    getJobs: function()
    {
        return model.jobs;
    },

    getSchools: function()
    {
        return model.education.schools;
    },

    getOnlineCourses: function()
    {
        return model.education.onlineCourses;
    },

    getProjects: function()
    {
        return model.projects.projects;
    },

    populateDefaultTag: function(tag, value)
    {
        /** Replace the helper.js default data placeholder with the passed value. */
        return tag.replace(model.defaultPlaceholder, value);
    },

    displayIfPopulated: function(pageLoc, tag, value)
    {
        /** Update the tag/value pair at the specified page locations.  Do not display
        the tag/value pair if no value is passed. */
        if (value.length > 0)
        {
            $(pageLoc).append(this.populateDefaultTag(tag, value));
        }
    },

    replaceUrl: function(originalValue, newUrl)
    {
        /** Replace the helper.js default URL placeholder with the passed URL. */
        return originalValue.replace(model.urlPlaceholder, newUrl);
    },
};

var bioView =
{
    init: function()
    {
        this.header = "#header";
        this.mapDiv = "#mapDiv";
        this.topContacts = "#topContacts";
        this.footerContacts = "#footerContacts";
        this.skills = "#skills";

        this.formattedName = octopus.populateDefaultTag(HTMLheaderName, model.subject),
        this.formattedRole = octopus.populateDefaultTag(HTMLheaderRole, " " + model.role),

        this.render();
    },
    render: function()
    {
        $(this.header).prepend(this.formattedRole);
        $(this.header).prepend(this.formattedName);

        $(this.mapDiv).append(googleMap);

        $(this.header).append(octopus.populateDefaultTag(HTMLbioPic, octopus.getBio().biopic));

        octopus.displayIfPopulated(this.topContacts, HTMLmobile, octopus.getContacts().mobile);
        octopus.displayIfPopulated(this.topContacts, HTMLemail, octopus.getContacts().email);
        octopus.displayIfPopulated(this.topContacts, HTMLgithub, octopus.getContacts().github);
        octopus.displayIfPopulated(this.topContacts, HTMLtwitter, octopus.getContacts().twitter);
        octopus.displayIfPopulated(this.topContacts, HTMLlocation, octopus.getContacts().location);

        octopus.displayIfPopulated(this.footerContacts, HTMLmobile, octopus.getContacts().mobile);
        octopus.displayIfPopulated(this.footerContacts, HTMLemail, octopus.getContacts().email);
        octopus.displayIfPopulated(this.footerContacts, HTMLgithub, octopus.getContacts().github);
        octopus.displayIfPopulated(this.footerContacts, HTMLtwitter, octopus.getContacts().twitter);
        octopus.displayIfPopulated(this.footerContacts, HTMLlocation, octopus.getContacts().location);

        if (octopus.getBio().skills.length > 0)
        {
            $(this.header).append(HTMLskillsStart);

            for (var skill = 0; skill < octopus.getSkills().length; skill++)
            {
                octopus.displayIfPopulated(this.skills, HTMLskills, octopus.getSkills()[skill]);
            }
        }
    }
};

var workView =
{
    init: function()
    {
        this.workExperience = "#workExperience";
        this.lastWorkEntry = ".work-entry:last";

        this.render();
    },
    render: function()
    {
        for (var job = 0; job < octopus.getJobs().length; job++)
        {
            $(this.workExperience).append(HTMLworkStart);
            $(this.lastWorkEntry).append
                (octopus.populateDefaultTag(octopus.replaceUrl(HTMLworkEmployer, octopus.getJobs()[job].url), octopus.getJobs()[job].employer) +
                 octopus.populateDefaultTag(HTMLworkTitle, octopus.getJobs()[job].title) +
                 octopus.populateDefaultTag(HTMLworkDates, octopus.getJobs()[job].dates) +
                 octopus.populateDefaultTag(HTMLworkLocation, octopus.getJobs()[job].location) +
                 octopus.populateDefaultTag(HTMLworkDescription, octopus.getJobs()[job].description));
        }
    }
};


var educationView =
{
    init: function()
    {
        this.education = "#education";
        this.lastEducationEntry = ".education-entry:last";
        this.majorDisplay = "";
        this.formattedOnlineUrl = "";
        this.formattedOnlineTitle = "";
        this.formattedOnlineSchool = "";
        this.formattedOnlineDates = "";

        this.render();
    },
    render: function()
    {
        console.log("schools: " + octopus.getSchools().length);
        for (school = 0; school < octopus.getSchools().length; school++)
        {
            $(this.education).append(HTMLschoolStart);

            this.formattedDegree = octopus.populateDefaultTag(HTMLschoolDegree, octopus.getSchools()[school].degree);
            console.log("formattedDegree: " + this.formattedDegree);
            octopus.displayIfPopulated(this.lastEducationEntry, octopus.replaceUrl(HTMLschoolName, octopus.getSchools()[school].url), octopus.getSchools()[school].name + this.formattedDegree);

            octopus.displayIfPopulated(this.lastEducationEntry, HTMLschoolLocation, octopus.getSchools()[school].location);
            octopus.displayIfPopulated(this.lastEducationEntry, HTMLschoolDates, octopus.getSchools()[school].dates);

            this.majorDisplay = "";

            if (octopus.getSchools()[school].majors.length > 0)
            {
                for (var major = 0; major < octopus.getSchools()[school].majors.length; major++)
                {
                    if (major > 0)
                    {
                        this.majorDisplay = this.majorDisplay + ", ";
                    }

                    this.majorDisplay = this.majorDisplay + octopus.getSchools()[school].majors[major];
                }
            }

            octopus.displayIfPopulated(this.lastEducationEntry, HTMLschoolMajor, this.majorDisplay);
        }

        if (octopus.getOnlineCourses.length > 0)
        {
            $(this.education).append(HTMLonlineClasses);

            for (course = 0; course < octopus.getOnlineCourses.length; course++)
            {
                $(this.education).append(HTMLschoolStart);

                this.formattedOnlineUrl = octopus.replaceUrl(HTMLonlineTitle, octopus.getOnlineCourses[course].url);
                this.formattedOnlineTitle = octopus.populateDefaultTag(this.formattedOnlineUrl, octopus.getOnlineCourses[course].title);
                this.formattedOnlineSchool = octopus.populateDefaultTag(HTMLonlineSchool, octopus.getOnlineCourses[course].school);
                this.formattedOnlineDates = octopus.populateDefaultTag(HTMLonlineDates, octopus.getOnlineCourses[course].dates);

                $(this.lastEducationEntry).append(this.formattedOnlineTitle + this.formattedOnlineSchool);
                octopus.displayIfPopulated(this.lastEducationEntry, HTMLonlineDates, this.formattedOnlineDates);
            }
        }
    }
};

var projectView =
{
    init: function()
    {
        this.projects = "#projects";
        this.lastProjectEntry = ".project-entry:last";
        this.projectTitle = "";

        this.render();
    },
    render: function()
    {
        for (var project = 0; project < octopus.getProjects().length; project++)
        {
            this.projectTitle = octopus.replaceUrl(HTMLprojectTitle, octopus.getProjects()[project].url);

            if (octopus.getProjects()[project].images.length === 1)
            {
                $(this.projects).append(HTMLprojectStart.replace(model.rowPlaceholder, "row"));

                $(this.lastProjectEntry).append
                    (HTMLprojectLeft +
                     octopus.populateDefaultTag(this.projectTitle, octopus.getProjects()[project].title) +
                     octopus.populateDefaultTag(HTMLprojectDates, octopus.getProjects()[project].dates) +
                     octopus.populateDefaultTag(HTMLprojectDescription, octopus.getProjects()[project].description) +
                     model.divClose);

                $(this.lastProjectEntry).append
                    (HTMLprojectRight +
                    octopus.populateDefaultTag( HTMLprojectImage, octopus.getProjects()[project].images[0]) +
                     model.divClose);
            }
            else
            {
                $(this.projects).append(HTMLprojectStart.replace(model.rowPlaceholder, ""));

                $(this.lastProjectEntry).append
                    (octopus.populateDefaultTag(this.projectTitle, octopus.getProjects()[project].title) +
                     octopus.populateDefaultTag(HTMLprojectDates, octopus.getProjects()[project].dates) +
                     octopus.populateDefaultTag(HTMLprojectDescription, octopus.getProjects()[project].description));

                for (var image = 0; image < octopus.getProjects()[project].images.length; image++)
                {
                   $(this.lastProjectEntry).append
                        (octopus.populateDefaultTag(HTMLprojectImage, octopus.getProjects()[project].images[image]));
                }
            }
        }
    }
};


octopus.init();
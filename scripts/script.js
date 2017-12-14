// var rawData


// $.getJSON("data/senate.json", function(data) {
//     rawData = data;

//     console.log(data);
//     buildTable()
// })


// function buildTable() {

//     console.log("Bilding Table")
//     var table = $("#politicians")
//     $.each(rawData.results[0].members, function(index, member) {

//         console.log(member)
//         var tr = $("<tr>")

//         var fullName = [member.first_name, member.middle_name, member.last_name].filter(function(v) { return v !== null }).join(" ")

//         var link = $("<a>").text(fullName).attr("href", member.url)
//         $("<td>").append(link).appendTo(tr)

//         $("<td>").text(member.party).appendTo(tr)

//         $("<td>").text(member.state).appendTo(tr)

//         $("<td>").text(member.seniority).appendTo(tr)

//         $("<td>").text(member.votes_with_party_pct).appendTo(tr)



//         table.append(tr)

//     })
// }


function DataHandler() {

    this.jsonURL = "";
    this.chamber = ""; // sentate or house
    this.rawData = ""; // stores data from the server
    this.members = [];
    this.filterStatus = {
    	D: true,
    	R: true,
    	I: true,
    	state: ""
    }


    this.init = function() {
    	console.log("initializingData")
        this.chamber = $("body").data("congress"); // senate or house?
        this.jsonURL = "data/" + this.chamber + ".json";
        this.initializeCheckbox ()
    }
    this.initializeCheckbox = function(){
    	var that=this
    	$("input").on("change", function(){
    		that.filterStatus.D =



    		that.buildTable()
    	})
    }
    this.loadJsonFile = function() {
        var that = this;
        $.getJSON(this.jsonURL, function(response) {
            console.log("LoadedJson")
            that.rawData = response;
            that.members = that.rawData.results[0].members;
            that.buildTable();
        })

        // this.loadJsonStates = function() {
        // var that = this;
        // $.getJSON(this.jsonURL, function(response) {
        //     that.rawData = response;
        //     that.members = that.rawData.results[0].members.state;
        //     that.buildTable();
        // })
    }

    this.buildTable = function() {

        var table = $("#politiciansTable tbody");
        var that = this;
        var tableRows = [];
        $.each(this.members, function(i, member) {

            // console.log(member.party) // R D or I
            //    console.log(tgifFilter[member.party])
            // valid?
            if (that.shouldShowMember(member)) {

                var tr = $("<tr>");
                var fullname = [member.first_name, member.middle_name, member.last_name].join(" ").replace("  ", " ")
                var link = $("<a>").text(fullname).attr("href", member.url);
                $("<td>").append(link).appendTo(tr)

                tr.append($("<td>").text(member.party));
                tr.append($("<td>").text(member.state));
                tr.append($("<td>").text(member.seniority));
                tr.append($("<td>").text(member.votes_with_party_pct + "%"));
                tableRows.push(tr);
            }
        })
        table.html("").append(tableRows);
    }
    this.shouldShowMember = function (member) {
    	if (!this.filterStatus[member.party]) {
    		return false
    	}

    	return true
    }

}




var dataHandler = new DataHandler();
$(function() {
    console.log("document loaded...")
    dataHandler.init();
    dataHandler.loadJsonFile();

    console.log(dataHandler)
})

// $(document).on("click", function(){
// 	console.log("document clicked...")
// } )

// $("#myTextInput").on("change", function() {
//     console.log("change...");
//     $("#textValue").text($(this).val())
// })

// $("#myTextInput").on("focus", function() {
//     console.log("focus...");
//     $(this).css("background", "red");
// })

// $("#myTextInput").on("blur", function() {
//     console.log("blur...");
//     $(this).css("background", "white");
// })

// $("#myTextInput").on("keydown", function() {
//     console.log("keydown...");

// })
// $("#myTextInput").on("keyup", function() {
//     console.log("keyup...");
//     $("#textValue").text($(this).val())
// })
// $("#myTextInput").on("keypress", function() {
//     console.log("keypress...");
// })


// $("#filter input[type=checkbox]").on("change", function() {
//     console.log("checkbox change");

//     tgifFilter.updateParty($(this).val(), $(this).prop("checked"))
// })


// $("#myTextInput").change(function(){
// 	console.log("change with _change_")
// })





// function Filter() {

//     this.partyFilter = {
//         "D": true,
//         "R": true,
//         "I": true
//     }

//     this.activeState = "";

//     this.updateParty = function(party, checked) {

//         console.log("=====")
//         console.log("should update parties now...")
//         console.log("party: ", party)
//         console.log("checked: ", checked)
//         console.log("current value: ", this[party])

//         this.partyFilter[party] = checked;

//         // if( party == "D") {
//         //     this.D = checked
//         // } else if (party == "R") {
//         //     this.R = checked
//         // } else if (party == "I") {
//         //     this.I = checked
//         // }

//         // this[ // this.D or this.R or this.I

//         // if(party == "D"){
//         // 	if(checked){
//         // 		this.D = true
//         // 	} else{
//         // 		this.D = false
//         // 	}
//         // }

//         // ..better


//         console.log("new value: ", this[party])

//         dataHandler.updateTable();

//     }


//     this.shouldShowMember = function(member) {

//         // console.log("checking if we should show", member.first_name, member.last_name, member.party)

//         console.log(this[member.party])


//         return this.partyFilter[member.party];
//     }
// }



// var tgifFilter = new Filter();

// tgifFilter.updateParty("CDU", false)


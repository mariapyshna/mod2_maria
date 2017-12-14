function DataHandler() {

    this.jsonURL = "";
    this.chamber = ""; // sentate or house
    this.rawData = ""; // stores data from the server
    this.members = [];

    this.init = function() {
        this.chamber = $("body").data("congress"); // senate or house?
        this.jsonURL = "data/" + this.chamber + ".json";
    }

    this.loadJsonFile = function() {
        var that = this;
        $.getJSON(this.jsonURL, function(response) {
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

        var tableRows = [];
        $.each(this.members, function(i, member) {

            // console.log(member.party) // R D or I
            //    console.log(tgifFilter[member.party])
            // valid?
            if (tgifFilter.shouldShowMember(member)) {

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
        table.append(tableRows);
    }

    this.updateTable = function() {

        $("#politiciansTable tbody").html("");
        this.buildTable();
    }

}

var dataHandler = new DataHandler();
dataHandler.init();
dataHandler.loadJsonFile();

console.log(dataHandler)


$(document).on("ready", function() {
    console.log("document loaded...")
})
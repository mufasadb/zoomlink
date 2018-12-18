function makeLink(url, name) {
    let link = {
        URL: url,
        name: name,
        currentlyBooked: false,
        user: ''
    }
    return link
}
module.exports = {
    listLinks: function () {
        let list = [];
        list.push(makeLink("https://zoom1", "last"));
        list.push(makeLink("https://zoom2", "second"));
        list.push(makeLink("https://zoom3", "first"))
        return list
    },
    addBooking: function (list, currentUser) {
        let selectedLink = null;
        let message = "";
        for (i = 0; i < list.length; i++) {
            if (list[i].currentlyBooked === false) {
                selectedLink = i
            };
        };
        if (selectedLink == null) {
            error = "It looks like I don't have any zoom links left, you can check who has the rooms booked with zoomlink booked"
        } else {
            list[selectedLink].currentlyBooked = true;
            list[selectedLink].user = currentUser;
        }
        if (list[selectedLink] != null) {
            message = "Thanks, " + currentUser + "your zoom link is below, please don't forget to sign out when you're done /n" + list[selectedLink].URL;
          } else {
            message = message;
          }
        results = {
            message: message,
            list: links
        }
        return [list, selectedLink, error]
    },
    removeBooking: function (list, currentUser) {
        let selectedLink = null
        let error = '';
        for (i = 0; i < list.length; i++) {
            if (list[i].user == currentUser) {
                selectedLink = i
            }
        }
        if (selectedLink == null) {
            error = "It looks like you didn't have a zoom link booked at the moment, try booking one with zoomlink start"
        } else {
            list[selectedLink].currentlyBooked = false;
            list[selectedLink].user = '';
        }
        return [list, selectedLink, error]
    },
    Booked: function (list){
        let message = '';
        for (i = 0; i < list.length; i++){
            if(list[i].currentlyBooked == true){
                let addedString = "Zoom link " + list[i].name + " is currently booked out by " + list[i].user + "/n";
                message = message + addedString;
            }
        }
        let results = {
            message: message,
            list: list
        }
        return results
    }

}
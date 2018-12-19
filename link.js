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
        if (selectedLink != null) {
            list[selectedLink].currentlyBooked = true;
            list[selectedLink].user = currentUser;
            message = "Thanks, " + currentUser + " your zoom link is below, please don't forget to sign out when you're done \n" + list[selectedLink].URL;
        } else {
            message = "It looks like I don't have any zoom links left, you can check who has the rooms booked with zoomlink booked"
        };
        let results = {
            message: message,
            list: list
        }
        return results
    },
    removeBooking: function (list, currentUser) {
        let selectedLink = null
        let message = '';
        for (i = 0; i < list.length; i++) {
            if (list[i].user == currentUser) {
                selectedLink = i
            }
        }
        if (selectedLink == null) {
            message = "It looks like you didn't have a zoom link booked at the moment, try booking one with zoomlink start"
        } else {
            list[selectedLink].currentlyBooked = false;
            list[selectedLink].user = '';
            message = "Thanks, " + currentUser + " I've logged you out of the zoom link " + list[selectedLink].name
        }
        let results = {
            message: message,
            list: list
        }
        return results
    },
    Booked: function (list) {
        let message = '';
        for (i = 0; i < list.length; i++) {
            if (list[i].currentlyBooked == true) {
                let addedString = "Zoom link " + list[i].name + " is currently booked out by " + list[i].user + "\n";
                message = message + addedString;
            }
        }
console.log(message.length);
        let results = {
            message: message,
            list: list
        }
        return results
    }

}
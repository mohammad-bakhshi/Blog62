let Dashboard = (() => {
    let global = {
        tooltipOptions: {
            placement: "right"
        },

        menuClass: ".c-menu"
    };

    let menuChangeActive = el => {
        $(global.menuClass + " .is-active").removeClass("is-active");
        $(el).addClass("is-active");
    };

    let sidebarChangeWidth = () => {
        let $menuItemsTitle = $("li .menu-item__title");

        $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
        $(".hamburger-toggle").toggleClass("is-opened");

        if ($("body").hasClass("sidebar-is-expanded")) {
            $('[data-toggle="tooltip"]').tooltip("destroy");
        } else {
            $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
        }

    };

    return {
        init: () => {
            $(".js-hamburger").on("click", sidebarChangeWidth);

            $(".js-menu li").on("click", e => {
                menuChangeActive(e.currentTarget);
            });

            $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
        }
    };

})();

Dashboard.init();

const deleteBlogger = (bloggerId) => {
    fetch(`/admin/profile/${bloggerId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => window.location.href = '/admin/profile')
        .catch(function (error) {
            console.log(error);
        })
}

const deleteArticle = (bloggerID, articleID) => {
    fetch(`/admin/article/${bloggerID}/${articleID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => window.location.href = '/admin/profile')
        .catch(function (error) {
            console.log(error);
        })
}

const deleteComment = (bloggerID, commentID) => {
    fetch(`/admin/comment/${bloggerID}/${commentID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => window.location.href = '/admin/profile')
        .catch(function (error) {
            console.log(error);
        })
}

const showContent = (content) => {
    switch (content) {
        case 'blogger':
            $('.page-title').text("Bloggers");
            $('#bloggerTable').show();
            $('#articleTable').hide();
            $('#commentTable').hide();
            break;
        case 'article':
            $('.page-title').text("Articles");
            $('#articleTable').show();
            $('#bloggerTable').hide();
            $('#commentTable').hide();
            break;
        case 'comment':
            $('.page-title').text("Comments");
            $('#commentTable').show();
            $('#bloggerTable').hide();
            $('#articleTable').hide();
            break;
    }
}
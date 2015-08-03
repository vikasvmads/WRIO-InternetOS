var React = require('react'),
    CreateArticleLists = require('./CreateArticleLists'),
    CreateArticleElement = require('./CreateArticleElement'),
    CreateItemLists = require('./CreateItemLists'),
    CreateCover = require('./CreateCover'),
    Carousel = require('react-bootstrap').Carousel,
    CarouselItem = require('react-bootstrap').CarouselItem;

var CreateArticleList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        id: React.PropTypes.string
    },
    getArticles: function () {
        return this.props.data
            .filter(function (o) {
                return o['@type'] === 'Article';
            })
            .map(function (o, key) {
                if (o.url) {
                    return <CreateArticleLists data={o} key={key} />;
                } else {
                    return <CreateArticleElement data={o} key={key} />;
                }
            });
    },
    isCover: function() {
        var location = window.location.search.substring(1).split('&');
        location = location.filter(function(item) {
            return item === 'cover';
        });
        return location.length > 0;
    },
    getItemList: function() {
        return this.props.data.filter(function (o) {
            return o['@type'] === 'ItemList';
        }).map(function (list) {
            return list.itemListElement.map(function (item, key) {
                return <CreateItemLists data={item} key={key} />;
            });
        });
    },
    getCoverList: function() {
        var data = this.props.data.filter(function (o) {
            return o['@type'] === 'ItemList';
        }).map(function (list) {
            return list.itemListElement.map(function (item, key) {
                return <CarouselItem><CreateCover data={item} key={key} isActive={key === 0} /></CarouselItem>;
            });
        });
        return (
            <Carousel>{data}</Carousel>
        );
    },
    componentDidUpdate: function () {
        var id = this.props.id;
        if (id) {
            location.hash = '#' + id;
        }
    },
    render: function () {
        var itemList = (this.isCover()) ? this.getCoverList() : this.getItemList();
        return (
            <article>
                {itemList}
                {this.getArticles()}
            </article>
        );
    }
});

module.exports = CreateArticleList;
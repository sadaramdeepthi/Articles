import React, { Component } from 'react'

export default class Test extends Component {
  async componentDidMount() {
    let data = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    )

    data = await data.json()
    console.log(data)
    let items = data
      .splice(1, 10)
      .map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        ),
      )
    let results = await Promise.all(items)
    results = results.map((result) => result.json())
    let articles = await Promise.all(results)
    console.log(articles)
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    )
  }
}

interface ViewObserver {
  updateView: ViewUpdateFunction
}

type ViewUpdateFunctionProps = {}

export type ViewUpdateFunction = (options: ViewUpdateFunctionProps) => void

export class View {
  private $body: JQuery
  private _images: Images
  private _label: Label

  constructor() {
    this.$body = $(`<div class="card"></div>`)
    this._images = new Images()
    this._label = new Label()

    this.$body.append(this._images.render, this._label.render)
  }

  addImage(image: string) {
    this._images.addImage(image)
  }

  set displayImage(index: number) {
    this._images.displayImage = index
  }

  set lux(lux: boolean) {
    this._label.lux = lux
  }

  set number(number: string) {
    this._label.number = number
  }

  set price(price: string) {
    this._label.price = price
  }

  set reviews(reviews: number) {
    this._label.reviews = reviews
  }

  set rating(rating: number | undefined) {
    this._label.rating = rating
  }

  private observers: ViewObserver[] = []

  sub(o: ViewObserver) {
    this.observers.push(o)
  }

  unsub(o: ViewObserver) {
    this.observers.filter((ob) => o !== ob)
  }

  update: ViewUpdateFunction = (options) => {
    this.observers.forEach((o) => o.updateView(options))
  }

  get render() {
    return this.$body
  }
}

class Images {
  private $body: JQuery
  private $image: JQuery
  private _arrows: Arrows
  private _images: string[] = []
  private _displayImageIndex: number = 0
  private _balls: Balls

  constructor() {
    this.$body = $(`<div class="card__images"></div>`)
    this.$image = $(`<img class="card__image" alt="room image"></img>`)
    this._arrows = new Arrows()
    this._balls = new Balls()
    this._arrows.hide()
    this._balls.hide()

    this.$body.append(this.$image, this._arrows.render, this._balls.render)
  }

  addImage(image: string) {
    if (this._images.length === 4) {
      return
    }
    this._images.push(image)
    this._balls.addBall()
    this.displayImage = 0
    if (this._images.length > 1) {
      this._arrows.show()
      this._balls.show()
    }
  }

  set displayImage(index: number) {
    const prevIndex = this._displayImageIndex
    this._displayImageIndex = index > this._images.length - 1 ? 0 : index
    this._balls.setBallActive(prevIndex, this._displayImageIndex)
    this.resetImage()
  }

  private resetImage() {
    this.$image.attr("src", `/assets/img/${this._images[this._displayImageIndex]}`)
  }

  get render() {
    return this.$body
  }
}

class Arrows {
  private $body: JQuery
  private $arrowWrapperLeft: JQuery
  private $arrowWrapperRight: JQuery
  private $arrowLeft: JQuery
  private $arrowRight: JQuery

  constructor() {
    this.$body = $(`<div class="card__arrows"></div>`)
    this.$arrowWrapperLeft = $(`<div class="card__arrow-wrapper-left"></div>`)
    this.$arrowLeft = $(`<div class="card__arrow-left">expand_more</div>`)
    this.$arrowWrapperRight = $(`<div class="card__arrow-wrapper-right"></div>`)
    this.$arrowRight = $(`<div class="card__arrow-right">expand_more</div>`)

    this.$body.append(
      this.$arrowWrapperLeft.append(this.$arrowLeft),
      this.$arrowWrapperRight.append(this.$arrowRight)
    )
  }

  hide() {
    this.$body.hide()
  }

  show() {
    this.$body.show()
  }

  get render() {
    return this.$body
  }
}

class Balls {
  private $body: JQuery
  readonly _balls: Ball[] = []

  constructor() {
    this.$body = $(`<div class="card__balls"></div>`)
  }

  addBall() {
    const newBall = new Ball()
    this._balls.push(newBall)
    this.$body.append(newBall.render)
  }

  setBallActive(prevIndex: number, index: number) {
    this._balls[prevIndex].current = false
    this._balls[index].current = true
  }

  hide() {
    this.$body.hide()
  }

  show() {
    this.$body.show()
  }

  get render() {
    return this.$body
  }
}

class Ball {
  private $body: JQuery
  private _current: boolean = false

  constructor() {
    this.$body = $(`<div class="card__ball"></div>`)
  }

  set current(current: boolean) {
    this._current = current

    if (this._current) {
      this.$body.addClass("card__ball--full")
      return
    }
    this.$body.removeClass("card__ball--full")
  }

  get render() {
    return this.$body
  }
}

class Label {
  private $body: JQuery
  private $top: JQuery
  private $title: JQuery
  private $number: JQuery
  private $lux: JQuery
  private $priceWrapper: JQuery
  private $price: JQuery

  private $bottom: JQuery
  private _rating: Rating
  private $reviewsWrapper: JQuery
  private $reviews: JQuery

  constructor() {
    this.$body = $(`<div class="card__label"></div>`)
    this.$top = $(`<div class="card__label-top"></div>`)
    this.$title = $(`<div class="card__title">№&nbsp;</div>`)
    this.$number = $(`<div class="card__number"></div>`)
    this.$lux = $(`<div class="card__lux"></div>`)
    this.$priceWrapper = $(`<div class="card__price-wrapper"> в сутки</div>`)
    this.$price = $(`<div class="card__price"></div>`)

    this.$bottom = $(`<div class="card__label-bottom"></div>`)
    this._rating = new Rating()
    this.$reviewsWrapper = $(
      `<div class="card__reviews-wrapper"> отзывов</div>`
    )
    this.$reviews = $(`<div class="card__reviews"></div>`)

    this.$body.append(
      this.$top.append(
        this.$title.append(this.$number, this.$lux),
        this.$priceWrapper.prepend(this.$price)
      ),
      this.$bottom.append(
        this._rating.render,
        this.$reviewsWrapper.prepend(this.$reviews)
      )
    )
  }

  set lux(lux: boolean) {
    if (lux) {
      this.$lux.html("&nbsp;люкс")
      return
    }
    this.$lux.text("")
  }

  set number(number: string) {
    this.$number.text(number)
    this._rating.name = number
  }

  set price(price: string) {
    this.$price.text(`${price}₽`)
  }

  set reviews(reviews: number) {
    this.$reviews.text(String(reviews))
  }

  set rating(rating: number | undefined) {
    this._rating.rating = rating
  }

  get render() {
    return this.$body
  }
}

class Rating {
  private $body: JQuery
  private $inputs: JQuery
  private _stars: JQuery[] = []

  constructor() {
    this.$body = $(`<div class="card__rate"></div>`)
    this.$inputs = $(`<div class="rate"></div>`)
    for (let i = 0; i < 5; i++) {
      const star = $(
        `<input type="radio" value="${i + 1}" class="rate__input"></input>`
      )
      this._stars[i] = star
      this.$inputs.append(star)
    }
    this.$body.append(this.$inputs)
  }

  set name(name: string) {
    this._stars.forEach((star) => {
      star.attr("name", name)
    })
  }

  set rating(rating: number | undefined) {
    if (typeof rating === "undefined") {
      return
    }
    this._stars[rating - 1].prop("checked", true)
  }

  get render() {
    return this.$body
  }
}

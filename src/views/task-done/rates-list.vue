<template>
    <div class="rates-list">

        <div v-for="rate in rates"
             class="rate-card"
             @click="() => {rateClick(rate)}">

            <div class="rate-card__user">
                <img class="rate-card__user-photo"
                     :src="rate.user.photo"
                     :alt="rate.user.name">

                <div class="rate-card__user-name">
                    {{ rate.user.name }}
                </div>

                <div class="rate-card__user-rating">
                    <i class="mdi mdi-star"></i>
                    <i class="mdi mdi-star"></i>
                    <i class="mdi mdi-star"></i>
                    <i class="mdi mdi-star"></i>
                    <i class="mdi mdi-star"></i>
                </div>
            </div>

            <div class="rate-card__content">
                <div class="rate-card__date">
                    <i class="mdi mdi-calendar-clock"></i> {{ rate.date }}
                </div>

                <div class="rate-card__price">
                    <span class="rate-card__price-label">Мастер готов предложить: </span>
                    <span class="rate-card__price-value">{{ rate.price }}</span>
                </div>

                <div class="rate-card__text">{{ rate.text }}</div>
            </div>

        </div>

    </div>
</template>

<script>
    import female1 from '../../assets/images/avatars/female-1.jpg';
    import female2 from '../../assets/images/avatars/female-2.jpg';
    import female3 from '../../assets/images/avatars/female-3.jpg';

    import male1 from '../../assets/images/avatars/male-1.jpg';
    import male2 from '../../assets/images/avatars/male-2.jpg';
    import male3 from '../../assets/images/avatars/male-3.jpg';

    const avatars = [
        female1,
        female2,
        female3,
        male1,
        male2,
        male3,
    ];

    const avatarsLength = avatars.length - 1;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export default {
        name: "rates-list",
        props: {
            rateClick: {
                type: Function,
                default: (rate) => {}
            }
        },
        data() {
            return {
                rates: _.map(Array(10), (rate, index) => {
                    let id = index + 1;
                    let date = new Date();

                    date = date.toLocaleString('ru', {});

                    return {
                        id: id,
                        date: date,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor ex itaque maiores molestiae nulla porro sed, suscipit tempora temporibus velit voluptatum. Animi atque molestias porro quidem repellendus rerum ut.',
                        price: getRandomInt(500, 2000),
                        user: {
                            photo: avatars[getRandomInt(0, avatarsLength)],
                            name: `User ${id}`,
                            rating: getRandomInt(0, 5),
                            phone: `+7 (999) ${getRandomInt(100, 999)}-${getRandomInt(10, 99)}-${getRandomInt(10, 99)}`
                        },
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rate-card {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 15px 10px;
        border-bottom: 1px solid #ddd;
        transition: 0.2s ease;
        cursor: pointer;

        &:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        &:hover {
            box-shadow: 0 3px 10px 0 rgba(#000, 0.3);
        }

        &__user {
            flex: 0 0 auto;
            display: block;
            text-align: center;
        }

        &__user-photo {
            $size: 60px;

            display: block;
            width: $size;
            height: $size;
            margin: 0 auto;
            border-radius: $size / 2;
        }

        &__user-name {
            display: block;
            margin-top: 5px;
            font-weight: bold;
        }

        &__user-rating {
            color: #CCC;
        }

        &__content {
            flex: 1 1 auto;
            width: 100%;
            max-width: 100%;
            margin: 0 0 0 15px;
        }

        &__date {
            margin-bottom: 10px;
            color: #555;
            font-size: 90%;
            font-style: italic;
        }

        &__price {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 125%;
        }
        &__price-label {
        }

        &__price-value {
            color: #61bd4f;

        }
    }

</style>

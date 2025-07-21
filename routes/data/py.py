import json
import random

baseurl = 'https://raw.githubusercontent.com/muhammednashat/images_shopping_app/main/'
category = list = ["girls"]
# , "boys","kids","girls"
# subCategory = ["hoodies","tshirt", "jackets","sneakers" , "shorts"]
# subCategory = ["sweaters","jeans", "tshirts","sneakers" , "sandals"]
# subCategory = ["sets","rompers", "pajamas","sneakers" , "sandals"]
# subCategory = [""backpacks","flats" , "dresses"]
subCategory = ["backpacks"]



choices = [True, False]
brand_names = [
    "Nike",
    "Puma",
    "Adidas",
    "Under Armour",
    "H&M"
]
products = []
for c in category:
  for s in subCategory:
    for x in range(1 , 31):
        rating = random.randint(0,5)
        numRating = 0 if rating == 0 else random.randint(15,215)
        originalPrice = random.randint(50,250)
        discount  = round(random.uniform(0.0, 60.0),1)
        salePrice = originalPrice - discount
        brandName = random.choice(brand_names)
        num = '0000'
        if x < 10:
          num= '00000'  
        products.append(
           {
            "name": f"{c} {s} {x}",
            "imageUrl": f"{baseurl}{c}%20{s}/{num}{x}.jpg",
            "category": "Clothing",
            "isnew": random.choice(choices),
            "isOnSale": random.choice(choices),
            "brandName": brandName,
            "rating": rating,
            "originalPrice": originalPrice,
            "salePrice": salePrice,
            "discount": f"{discount}%",
            "numRating": numRating,
            "description": f"High-quality {s} from {brandName}.",
            "mainCategory": c,
            "subCategory": s
           },
        )
        
productss = open("products.json","a")
productss.write(json.dumps(products, indent= 2))

productss.close() 

        
for x in range(30):
  print(products[x])
  print('-------------------')
        






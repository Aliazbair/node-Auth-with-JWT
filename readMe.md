#Creat node auth app


# hashed password
1.go to user model
2-make function fire  after doc saved to db
3- install bycrpt package
4-use salt and hash to bycrpt password

```js
 userSchema.pre('save',async function(next){
   const salt = await bcrypt.genSalt()
   this.password=await bcrypt.hash(this.password,salt)
     next()
 })
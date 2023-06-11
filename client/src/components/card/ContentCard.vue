<template>
  <div class="bg-light shadow-md rounded-md p-8 min-w-fit flex gap-4">
    <div class="flex flex-col items-center w-fit">
      <v-icon name="md-arrowdropup-sharp" scale="2" class="cursor-pointer hover:fill-highlight" />
      <p class="font-semibold">32</p>
      <v-icon name="md-arrowdropdown-sharp" scale="2" class="cursor-pointer hover:fill-highlight" />
    </div>
    <div>
      <h1 class="text-head-1 text-highlight" v-if="this.type === 'step'">Apply for SIM Card</h1>
      <h1 class="text-head-4" v-if="this.type === 'comment'">John Doe</h1>
      <p class="mt-4" v-if="this.type === 'step'">
        Ullamcorper amet ut mattis morbi egestas gravida nec blandit adipiscing. Varius mi dui ut
        adipiscing ac. Sagittis elit scelerisque hendrerit praesent amet adipiscing. Amet tempus
        turpis mattis velit eu id. Ut in ut ipsum laoreet dui. Tristique dui cursus sit euismod.
        Dolor amet donec id velit. Blandit consectetur magna vitae magna vitae diam sapien. Libero
        at vestibulum vel habitant. Natoque quisque ornare vulputate ac. Nibh quis montes sed massa
        in blandit massa.
        <br />
        <br />
        Ipsum id et laoreet ullamcorper risus. Eget egestas suspendisse dolor at tristique. At
        parturient eu nec tortor morbi rutrum. Magna fermentum mauris ac amet maecenas viverra
        tellus orci placerat. Egestas purus ac rhoncus phasellus dolor quis. Lectus sed et vel vitae
        euismod diam duis vitae. Mi bibendum euismod libero tempus vivamus elementum mauris
        adipiscing. Mauris purus nunc sed arcu. Ut integer dolor sed donec. Non enim justo fermentum
        ut elit tellus netus nibh. Porttitor condimentum nisl amet ut ut tortor. Vitae urna neque
        sagittis metus ac in tristique mattis. Nullam diam tincidunt sed dignissim tristique amet
        ultrices consectetur.
        <br />
        <br />
        At metus eget et eu. Aliquam elementum suspendisse nunc tristique risus cras. Purus
        pellentesque enim dignissim eu accumsan quis lectus. Tincidunt nec semper nisi amet quis
        ullamcorper integer mattis. Mi egestas odio elit fermentum tortor mi integer gravida eget.
        Lobortis eget nec in elit malesuada gravida massa tristique augue. Faucibus augue tempus
        vitae pharetra ipsum faucibus.
        <br />
        <br />
        Nibh et ut amet sed. Tincidunt tellus id massa netus vestibulum in facilisis. Rhoncus
        egestas neque fermentum non in eget suspendisse. Commodo tincidunt vitae viverra orci. Dolor
        sed amet nisl in nam luctus non ut. Rhoncus vel vitae in aliquam amet posuere. Integer
        faucibus sed nulla ut. Integer sit egestas enim placerat integer blandit. Libero diam neque
        amet blandit senectus et. Accumsan in mauris nullam quis ornare facilisis neque morbi massa.
        <br />
        <br />
        Vitae tristique amet at lectus posuere iaculis facilisi sed. Mattis duis tellus commodo
        velit rhoncus eget malesuada cursus cras. Faucibus mattis nunc commodo ligula vel
        pellentesque quam quis. Lorem non quis dui elit donec. Viverra eu arcu venenatis quam
        facilisis sapien venenatis ullamcorper. Dignissim suscipit sed sed nunc nec viverra. Feugiat
        amet quis dignissim vivamus arcu aliquam sed. Consectetur nunc pellentesque sem vel viverra
        sed metus. Non aliquet id bibendum suspendisse congue nunc ornare.
        <br />
        <br />
        Porttitor ornare egestas vel aliquam lectus. Interdum senectus pellentesque pretium
        malesuada sed diam. Nulla leo malesuada tellus sem purus sed. Feugiat a quis nibh in.
        Scelerisque accumsan urna id egestas. Phasellus morbi auctor nulla at magnis suspendisse
        lectus lorem non. Phasellus aliquam accumsan est mauris libero laoreet eget. Pulvinar diam
        pulvinar cursus pulvinar malesuada egestas etiam. Vitae sed tortor eget egestas. Quis arcu
        turpis duis non. Nibh elit vel cras in nibh aliquam.
        <br />
        <br />
        Mi in neque est eu lorem. Nulla metus lacinia nisi eget aliquam. Dignissim vel commodo
        pharetra sit diam odio aenean sit tellus. Pulvinar non vitae nulla rhoncus erat sed sed. In
        non consequat mattis ornare quam. Nunc cursus sed ut posuere sem ipsum diam nullam. Id
        ultricies eget risus id convallis sed mauris ut tortor. Semper fames lacus sed egestas
        maecenas vulputate fames ultrices aliquet.
      </p>
      <p class="mt-4" v-else>Great Content ! 🙂</p>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  components: {
    'v-icon': OhVueIcon
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
